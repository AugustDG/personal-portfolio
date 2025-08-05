"use client";

import React, { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface VimModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  type: "blog" | "project" | "image" | "gallery";
  metadata?: {
    date?: string;
    technologies?: string[];
    liveUrl?: string;
    githubUrl?: string;
    alt?: string;
    filename?: string;
  };
}

export default function VimModal({
  isOpen,
  onClose,
  title,
  content,
  type,
  metadata = {},
}: VimModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [lineCount, setLineCount] = useState(50); // Start with a reasonable default
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate line count based on content height
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const calculateLines = () => {
      const contentElement = contentRef.current;
      if (!contentElement) return;

      // Get the height of the content
      const contentHeight = contentElement.scrollHeight;
      // Estimate line height (adjust based on your CSS)
      const lineHeight = 20; // Approximate line height in pixels
      const estimatedLines = Math.ceil(contentHeight / lineHeight);

      // Set minimum of 30 lines for better UX
      setLineCount(Math.max(30, estimatedLines + 5)); // Add some buffer
    };

    // Calculate after a short delay to ensure content is rendered
    const timeoutId = setTimeout(calculateLines, 100);

    // Also recalculate when window resizes
    window.addEventListener("resize", calculateLines);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateLines);
    };
  }, [isOpen, content]);

  // Handle commands and click outside
  useEffect(() => {
    if (!isOpen) return;

    // Focus the command input when modal opens
    setTimeout(() => {
      commandInputRef.current?.focus();
    }, 100);

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Don't close on outside click for better UX
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent bubbling to terminal

    if (e.key === "Enter") {
      const cmd = commandInput.trim();
      if (cmd === "q" || cmd === "quit") {
        handleClose();
      }
      setCommandInput("");
    } else if (e.key === "Escape") {
      setCommandInput("");
      commandInputRef.current?.focus(); // Keep focus on command input
    }
  };

  if (!isOpen) return null;

  const getVimModeColor = () => {
    switch (type) {
      case "blog":
        return "text-terminal-accent-cyan bg-terminal-accent-cyan/20";
      case "project":
        return "text-terminal-accent-magenta bg-terminal-accent-magenta/20";
      case "image":
      case "gallery":
        return "text-terminal-accent-amber bg-terminal-accent-amber/20";
      default:
        return "text-terminal-accent-green bg-terminal-accent-green/20";
    }
  };

  const getFileExtension = () => {
    switch (type) {
      case "blog":
        return ".md";
      case "project":
        return ".json";
      case "image":
        return metadata.filename
          ? `.${metadata.filename.split(".").pop()}`
          : ".jpg";
      case "gallery":
        return ".gallery";
      default:
        return ".txt";
    }
  };

  return (
    <div
      className={`vim-modal-overlay ${isClosing ? "vim-modal-closing" : ""}`}
    >
      <div
        ref={modalRef}
        className={`vim-modal ${isClosing ? "vim-modal-content-closing" : ""} ${
          isMaximized ? "vim-modal-maximized" : ""
        }`}
      >
        {/* Vim Window Header */}
        <div className="vim-header">
          <div className="vim-tabs">
            <div className="vim-tab vim-tab-active">
              <span className="vim-tab-icon">●</span>
              <span className="vim-tab-name">
                {title}
                {getFileExtension()}
              </span>
              <button
                className="vim-tab-close"
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
          <div className="vim-window-controls">
            <button className="vim-control vim-minimize vim-minimize-disabled">
              −
            </button>
            <button
              className="vim-control vim-maximize"
              onClick={handleMaximize}
            >
              {isMaximized ? "◱" : "□"}
            </button>
            <button className="vim-control vim-close" onClick={handleClose}>
              ×
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="vim-content">
          {/* Line Numbers */}
          <div className="vim-line-numbers">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="vim-line-number">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="vim-editor" ref={contentRef}>
            {type === "image" && typeof content === "string" ? (
              <div className="vim-image-container">
                <img
                  src={content}
                  alt={metadata.alt || title}
                  className="vim-image"
                />
                {metadata.alt && (
                  <div className="vim-image-caption">{metadata.alt}</div>
                )}
              </div>
            ) : (
              <div className="vim-text-content">
                {/* Metadata for projects */}
                {type === "project" && metadata.technologies && (
                  <div className="vim-project-meta">
                    <div className="vim-tech-stack">
                      <span className="vim-label">Technologies:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {metadata.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-terminal-accent-purple/20 text-terminal-accent-purple px-2 py-1 rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="vim-project-links">
                      {metadata.liveUrl && (
                        <a
                          href={metadata.liveUrl}
                          className="vim-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🌐 Live Demo
                        </a>
                      )}
                      {metadata.githubUrl && (
                        <a
                          href={metadata.githubUrl}
                          className="vim-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📁 Source Code
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Render the main content */}
                <div className="vim-main-content">{content}</div>
              </div>
            )}
          </div>
        </div>

        {/* Vim Command Line */}
        <div className="vim-command-line">
          <span className="vim-command-prompt">:</span>
          <input
            ref={commandInputRef}
            type="text"
            value={commandInput}
            onChange={(e) => {
              e.stopPropagation();
              setCommandInput(e.target.value);
            }}
            onKeyUp={handleCommandSubmit}
            className="vim-command-input"
            placeholder="q to quit"
            autoFocus={true}
            tabIndex={0}
          />
          <span className="vim-cursor">█</span>
        </div>
      </div>
    </div>
  );
}
