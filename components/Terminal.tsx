"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CommandMap, OutputFunction } from "../types";
import {
  getAbout,
  getBlogPosts,
  getBlogPost,
  getProjects,
  getProject,
  getGalleries,
  getGallery,
} from "../lib/cms";
import MarkdownRenderer from "./MarkdownRenderer";
import VimModal from "./VimModal";

interface TerminalLine {
  id: string;
  type: "command" | "output";
  content: React.ReactNode;
  timestamp: Date;
}

interface AutoCompleteItem {
  text: string;
  description?: string;
}

interface CommandTreeNode {
  [key: string]: {
    description?: string;
    children?: CommandTreeNode;
    isComplete?: boolean;
  };
}

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autoCompleteItems, setAutoCompleteItems] = useState<
    AutoCompleteItem[]
  >([]);
  const [selectedAutoComplete, setSelectedAutoComplete] = useState(0);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Command tree structure
  const commandTree: CommandTreeNode = {
    help: {
      description: "Show available commands",
      isComplete: true,
    },
    about: {
      description: "Show about information",
      isComplete: true,
    },
    blog: {
      description: "Blog commands",
      children: {
        list: {
          description: "List all blog posts",
          isComplete: true,
        },
        view: {
          description: "Read a specific blog post",
          children: {
            "building-terminal-portfolio": {
              description: "Building a Terminal Portfolio",
              isComplete: true,
            },
            "react-hooks-deep-dive": {
              description: "React Hooks Deep Dive",
              isComplete: true,
            },
          },
        },
      },
    },
    projects: {
      description: "Projects commands",
      children: {
        list: {
          description: "Show my projects",
          isComplete: true,
        },
        view: {
          description: "View project details",
          children: {
            "terminal-portfolio": {
              description: "Terminal Portfolio Project",
              isComplete: true,
            },
            "task-management-app": {
              description: "Task Management App",
              isComplete: true,
            },
          },
        },
      },
    },
    gallery: {
      description: "Gallery commands",
      children: {
        list: {
          description: "Show available galleries",
          isComplete: true,
        },
        show: {
          description: "View gallery images",
          children: {
            "web-development": {
              description: "Web Development Gallery",
              isComplete: true,
            },
            photography: {
              description: "Photography Gallery",
              isComplete: true,
            },
          },
        },
      },
    },
    clear: {
      description: "Clear terminal",
      isComplete: true,
    },
  };

  // Modal state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    type: "blog" | "project" | "image" | "gallery";
    metadata: any;
  }>({
    isOpen: false,
    title: "",
    content: null,
    type: "blog",
    metadata: {},
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const welcomeShownRef = useRef(false);

  // Modal helper functions
  const openModal = (
    title: string,
    content: React.ReactNode,
    type: "blog" | "project" | "image" | "gallery",
    metadata = {}
  ) => {
    setModalState({
      isOpen: true,
      title,
      content,
      type,
      metadata,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    // Refocus the terminal input after modal closes
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Get autocomplete suggestions from command tree
  const getAutoCompleteSuggestions = (input: string): AutoCompleteItem[] => {
    const parts = input.trim().split(/\s+/);
    if (!parts[0]) return [];

    let currentNode: CommandTreeNode = commandTree;
    let builtPath: string[] = [];

    // Navigate through the tree based on the current input
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (currentNode[part] && currentNode[part].children) {
        currentNode = currentNode[part].children!;
        builtPath.push(part);
      } else {
        return []; // Invalid path
      }
    }

    // Get the current partial input (last part being typed)
    const currentPart = parts[parts.length - 1];
    const suggestions: AutoCompleteItem[] = [];

    // Find all matching options in the current node
    Object.keys(currentNode).forEach((key) => {
      if (key.toLowerCase().startsWith(currentPart.toLowerCase())) {
        const fullCommand = [...builtPath, key].join(" ");
        suggestions.push({
          text: fullCommand,
          description: currentNode[key].description,
        });
      }
    });

    return suggestions;
  };

  // Clickable command component
  const ClickableCommand = ({
    command,
    children,
  }: {
    command: string;
    children: React.ReactNode;
  }) => (
    <button
      className="accent-cyan hover:accent-amber transition-colors underline cursor-pointer"
      onClick={() => {
        setCurrentInput(command);
        processCommand(command);
      }}
    >
      {children}
    </button>
  );

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addToHistory = useCallback(
    (type: "command" | "output", content: React.ReactNode) => {
      const newLine: TerminalLine = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        content,
        timestamp: new Date(),
      };
      setHistory((prev) => [...prev, newLine]);
    },
    []
  );

  const output: OutputFunction = useCallback(
    (content: React.ReactNode) => {
      addToHistory("output", content);
    },
    [addToHistory]
  );

  // Command handlers
  const commands: CommandMap = {
    help: {
      description: "Show available commands",
      handler: () => {
        output(
          <div className="command-output">
            <div className="accent-green font-semibold mb-3">
              Available Commands:
            </div>
            <div className="space-y-1">
              <div>
                <ClickableCommand command="help">help</ClickableCommand> - Show
                this help message
              </div>
              <div>
                <ClickableCommand command="about">about</ClickableCommand> -
                Learn more about me
              </div>
              <div>
                <ClickableCommand command="blog list">
                  blog list
                </ClickableCommand>{" "}
                - List all blog posts
              </div>
              <div>
                <span className="accent-cyan">blog view &lt;slug&gt;</span> -
                Read a specific blog post
              </div>
              <div>
                <ClickableCommand command="projects list">
                  projects list
                </ClickableCommand>{" "}
                - Show my projects
              </div>
              <div>
                <span className="accent-cyan">projects view &lt;slug&gt;</span>{" "}
                - View project details
              </div>
              <div>
                <ClickableCommand command="gallery list">
                  gallery list
                </ClickableCommand>{" "}
                - Show available galleries
              </div>
              <div>
                <span className="accent-cyan">gallery show &lt;name&gt;</span> -
                View gallery images
              </div>
              <div>
                <ClickableCommand command="clear">clear</ClickableCommand> -
                Clear the terminal
              </div>
            </div>
            <div className="mt-4 text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark">
              💡 Tip: Use tab for auto-completion, ↑/↓ for command history, or
              click commands to run them
            </div>
          </div>
        );
      },
    },

    about: {
      description: "Show about information",
      handler: async () => {
        setIsProcessing(true);
        try {
          const about = await getAbout();
          output(
            <div className="command-output">
              <div className="accent-green text-xl font-bold mb-2">
                {about.name}
              </div>
              <div className="accent-amber text-lg mb-4">{about.title}</div>
              <div className="mb-4 leading-relaxed">{about.bio}</div>

              <div className="mb-4">
                <div className="accent-cyan font-semibold mb-2">Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {about.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-terminal-accent-blue/20 text-terminal-accent-blue px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="accent-magenta font-semibold mb-2">
                  Contact:
                </div>
                <div className="space-y-1">
                  <div>
                    📧{" "}
                    <a
                      href={`mailto:${about.contact.email}`}
                      className="accent-cyan hover:accent-amber transition-colors"
                    >
                      {about.contact.email}
                    </a>
                  </div>
                  <div>
                    🐙{" "}
                    <a
                      href={about.contact.github}
                      className="accent-cyan hover:accent-amber transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                  <div>
                    💼{" "}
                    <a
                      href={about.contact.linkedin}
                      className="accent-cyan hover:accent-amber transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        } catch (error) {
          output(
            <div className="command-output text-red-400">
              Error loading about information
            </div>
          );
        } finally {
          setIsProcessing(false);
        }
      },
    },

    blog: {
      description: "Blog commands",
      handler: async (args) => {
        const subCommand = args[0];

        if (subCommand === "list") {
          setIsProcessing(true);
          try {
            const posts = await getBlogPosts();
            output(
              <div className="command-output">
                <div className="accent-green font-semibold mb-3">
                  Blog Posts:
                </div>
                <div className="space-y-2">
                  {posts.map((post) => (
                    <div
                      key={post.slug}
                      className="border-l-2 border-terminal-accent-cyan pl-3"
                    >
                      <div className="accent-cyan font-medium">
                        {post.title}
                      </div>
                      <div className="text-sm text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark">
                        {post.date}
                      </div>
                      <div className="text-sm mt-1">{post.excerpt}</div>
                      <div className="text-xs accent-amber mt-1">
                        →{" "}
                        <ClickableCommand command={`blog view ${post.slug}`}>
                          blog view {post.slug}
                        </ClickableCommand>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          } catch (error) {
            output(
              <div className="command-output text-red-400">
                Error loading blog posts
              </div>
            );
          } finally {
            setIsProcessing(false);
          }
        } else if (subCommand === "view" && args[1]) {
          setIsProcessing(true);
          try {
            const post = await getBlogPost(args[1]);
            if (post) {
              openModal(
                post.title,
                <MarkdownRenderer content={post.content} />,
                "blog",
                { date: post.date }
              );
              output(
                <div className="command-output">
                  <div className="accent-green">
                    Opening blog post: {post.title}
                  </div>
                </div>
              );
            } else {
              output(
                <div className="command-output text-red-400">
                  Blog post '{args[1]}' not found
                </div>
              );
            }
          } catch (error) {
            output(
              <div className="command-output text-red-400">
                Error loading blog post
              </div>
            );
          } finally {
            setIsProcessing(false);
          }
        } else {
          output(
            <div className="command-output text-red-400">
              Usage: blog list | blog view &lt;slug&gt;
            </div>
          );
        }
      },
      autoComplete: (args) => {
        if (args.length === 0) return ["list", "view"];
        if (args[0] === "view" && args.length === 1) {
          // In a real app, you'd fetch blog slugs here
          return ["building-terminal-portfolio", "react-hooks-deep-dive"];
        }
        return [];
      },
    },

    projects: {
      description: "Projects commands",
      handler: async (args) => {
        const subCommand = args[0];

        if (subCommand === "list") {
          setIsProcessing(true);
          try {
            const projects = await getProjects();
            output(
              <div className="command-output">
                <div className="accent-green font-semibold mb-3">Projects:</div>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.slug}
                      className="border-l-2 border-terminal-accent-magenta pl-3"
                    >
                      <div className="accent-magenta font-medium">
                        {project.title}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-terminal-accent-purple/20 text-terminal-accent-purple px-2 py-0.5 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs accent-amber mt-2">
                        →{" "}
                        <ClickableCommand
                          command={`projects view ${project.slug}`}
                        >
                          projects view {project.slug}
                        </ClickableCommand>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          } catch (error) {
            output(
              <div className="command-output text-red-400">
                Error loading projects
              </div>
            );
          } finally {
            setIsProcessing(false);
          }
        } else if (subCommand === "view" && args[1]) {
          setIsProcessing(true);
          try {
            const project = await getProject(args[1]);
            if (project) {
              openModal(
                project.title,
                <MarkdownRenderer content={project.content} />,
                "project",
                {
                  technologies: project.technologies,
                  liveUrl: project.liveUrl,
                  githubUrl: project.githubUrl,
                }
              );
              output(
                <div className="command-output">
                  <div className="accent-magenta">
                    Opening project: {project.title}
                  </div>
                </div>
              );
            } else {
              output(
                <div className="command-output text-red-400">
                  Project '{args[1]}' not found
                </div>
              );
            }
          } catch (error) {
            output(
              <div className="command-output text-red-400">
                Error loading project
              </div>
            );
          } finally {
            setIsProcessing(false);
          }
        } else {
          output(
            <div className="command-output text-red-400">
              Usage: projects list | projects view &lt;slug&gt;
            </div>
          );
        }
      },
      autoComplete: (args) => {
        if (args.length === 0) return ["list", "view"];
        if (args[0] === "view" && args.length === 1) {
          return ["terminal-portfolio", "task-management-app"];
        }
        return [];
      },
    },

    gallery: {
      description: "Gallery commands",
      handler: async (args) => {
        const subCommand = args[0];

        if (subCommand === "list") {
          setIsProcessing(true);
          try {
            const galleries = await getGalleries();
            output(
              <div className="command-output">
                <div className="accent-green font-semibold mb-3">
                  Available Galleries:
                </div>
                <div className="space-y-2">
                  {galleries.map((gallery) => (
                    <div
                      key={gallery.name}
                      className="border-l-2 border-terminal-accent-amber pl-3"
                    >
                      <div className="accent-amber font-medium capitalize">
                        {gallery.name.replace("-", " ")}
                      </div>
                      <div className="text-sm text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark">
                        {gallery.images.length} images
                      </div>
                      <div className="text-xs accent-cyan mt-1">
                        →{" "}
                        <ClickableCommand
                          command={`gallery show ${gallery.name}`}
                        >
                          gallery show {gallery.name}
                        </ClickableCommand>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          } catch (error) {
            output(
              <div className="command-output text-red-400">
                Error loading galleries
              </div>
            );
          } finally {
            setIsProcessing(false);
          }
        } else if (subCommand === "show" && args[1]) {
          setIsProcessing(true);
          try {
            const gallery = await getGallery(args[1]);
            if (gallery) {
              output(
                <div className="command-output">
                  <div className="accent-amber text-xl font-bold mb-4 capitalize">
                    {gallery.name.replace("-", " ")} Gallery
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.images.map((image) => (
                      <div
                        key={image.filename}
                        className="border border-terminal-frame-light dark:border-terminal-frame-dark rounded p-2"
                      >
                        <img
                          src={image.thumbnail}
                          alt={image.alt}
                          className="w-full h-32 object-cover rounded mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() =>
                            openModal(image.filename, image.url, "image", {
                              alt: image.alt,
                              filename: image.filename,
                            })
                          }
                        />
                        <div className="text-xs accent-cyan">
                          {image.filename}
                        </div>
                        <div className="text-xs text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark mt-1">
                          {image.alt}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark">
                    💡 Tip: Click on any image to view in Vim-style modal
                  </div>
                </div>
              );
            } else {
              output(
                <div className="command-output text-red-400">
                  Gallery '{args[1]}' not found
                </div>
              );
            }
          } catch (error) {
            output(
              <div className="command-output text-red-400">
                Error loading gallery
              </div>
            );
          } finally {
            setIsProcessing(false);
          }
        } else {
          output(
            <div className="command-output text-red-400">
              Usage: gallery list | gallery show &lt;name&gt;
            </div>
          );
        }
      },
      autoComplete: (args) => {
        if (args.length === 0) return ["list", "show"];
        if (args[0] === "show" && args.length === 1) {
          return ["web-development", "photography"];
        }
        return [];
      },
    },

    clear: {
      description: "Clear terminal",
      handler: () => {
        setHistory([]);
      },
    },
  };

  // Process command input
  const processCommand = useCallback(
    async (input: string) => {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      // Add command to history
      addToHistory("command", `user@site:~$ ${trimmedInput}`);

      // Add to command history for arrow key navigation
      setCommandHistory((prev) => {
        const newHistory = [
          trimmedInput,
          ...prev.filter((cmd) => cmd !== trimmedInput),
        ];
        return newHistory.slice(0, 50); // Keep only last 50 commands
      });
      setHistoryIndex(-1);

      // Parse command and arguments
      const parts = trimmedInput.split(" ");
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Handle typos and corrections
      const commandKeys = Object.keys(commands);
      const exactMatch = commandKeys.find((cmd) => cmd === command);

      if (!exactMatch) {
        // Simple typo detection for demo
        const suggestions = commandKeys.filter(
          (cmd) =>
            Math.abs(cmd.length - command.length) <= 2 &&
            (cmd.includes(command.slice(0, 3)) ||
              command.includes(cmd.slice(0, 3)))
        );

        if (suggestions.length > 0) {
          output(
            <div className="command-output">
              <div className="text-red-400">Command '{command}' not found.</div>
              <div className="mt-2">
                <span className="text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark">
                  Did you mean:{" "}
                </span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="accent-cyan hover:accent-amber transition-colors mx-1 underline cursor-pointer"
                    onClick={() => {
                      setCurrentInput(
                        suggestion +
                          (args.length > 0 ? " " + args.join(" ") : "")
                      );
                      inputRef.current?.focus();
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          );
        } else {
          output(
            <div className="command-output text-red-400">
              Command '{command}' not found. Type 'help' to see available
              commands.
            </div>
          );
        }
        return;
      }

      // Execute command
      try {
        await commands[exactMatch].handler(args, output);
      } catch (error) {
        output(
          <div className="command-output text-red-400">
            Error executing command
          </div>
        );
      }
    },
    [addToHistory, output, commands]
  );

  // Handle input changes and auto-completion
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentInput(value);

      // Reset history navigation when user types manually
      setHistoryIndex(-1);

      if (value.trim()) {
        // Check if the input ends with a space - if so, show all possible next options
        if (value.endsWith(" ")) {
          const trimmedValue = value.trim();
          const parts = trimmedValue.split(/\s+/);
          let currentNode: CommandTreeNode = commandTree;

          // Navigate to the current position in the tree
          for (const part of parts) {
            if (currentNode[part] && currentNode[part].children) {
              currentNode = currentNode[part].children!;
            } else {
              // Invalid path, show no suggestions
              setShowAutoComplete(false);
              return;
            }
          }

          // Show all available options at this level
          const spaceSuggestions = Object.keys(currentNode).map((cmd) => ({
            text: `${trimmedValue} ${cmd}`,
            description: currentNode[cmd].description,
          }));

          setAutoCompleteItems(spaceSuggestions);
          setShowAutoComplete(spaceSuggestions.length > 0);
          setSelectedAutoComplete(0);
        } else {
          // Normal autocomplete based on partial input
          const suggestions = getAutoCompleteSuggestions(value);
          setAutoCompleteItems(suggestions);
          setShowAutoComplete(suggestions.length > 0);
          setSelectedAutoComplete(0);
        }
      } else {
        // Show all top-level commands when input is empty
        const topLevelSuggestions = Object.keys(commandTree).map((cmd) => ({
          text: cmd,
          description: commandTree[cmd].description,
        }));
        setAutoCompleteItems(topLevelSuggestions);
        setShowAutoComplete(true);
        setSelectedAutoComplete(0);
      }
    },
    []
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Don't handle keyboard events if modal is open
      if (modalState.isOpen) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        processCommand(currentInput);
        setCurrentInput("");
        // Show all top-level commands after executing a command
        const topLevelSuggestions = Object.keys(commandTree).map((cmd) => ({
          text: cmd,
          description: commandTree[cmd].description,
        }));
        setAutoCompleteItems(topLevelSuggestions);
        setShowAutoComplete(true);
        setSelectedAutoComplete(0);
      } else if (e.key === "Tab" && showAutoComplete) {
        e.preventDefault();
        if (autoCompleteItems.length > 0) {
          setCurrentInput(autoCompleteItems[selectedAutoComplete].text);
          setShowAutoComplete(false);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (showAutoComplete) {
          // Navigate auto-complete suggestions
          setSelectedAutoComplete((prev) =>
            prev > 0 ? prev - 1 : autoCompleteItems.length - 1
          );
        } else {
          // Navigate command history
          if (commandHistory.length > 0) {
            const newIndex = Math.min(
              historyIndex + 1,
              commandHistory.length - 1
            );
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (showAutoComplete) {
          // Navigate auto-complete suggestions
          setSelectedAutoComplete((prev) =>
            prev < autoCompleteItems.length - 1 ? prev + 1 : 0
          );
        } else {
          // Navigate command history
          if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
          } else if (historyIndex === 0) {
            setHistoryIndex(-1);
            setCurrentInput("");
          }
        }
      } else if (e.key === "Escape") {
        setShowAutoComplete(false);
        setHistoryIndex(-1);
      }
    },
    [
      currentInput,
      processCommand,
      showAutoComplete,
      autoCompleteItems,
      selectedAutoComplete,
      commandHistory,
      historyIndex,
      modalState.isOpen,
    ]
  );

  // Show welcome message on mount
  useEffect(() => {
    if (welcomeShownRef.current) return;

    welcomeShownRef.current = true;
    addToHistory(
      "output",
      <div className="command-output">
        <div className="accent-green text-2xl font-bold mb-2">
          Welcome to Portfolio Terminal v0.1
        </div>
        <div className="mb-4">
          An interactive terminal-style portfolio experience. Type{" "}
          <ClickableCommand command="help">help</ClickableCommand> to see
          available commands.
        </div>
        <div className="text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark text-sm">
          💡 Pro tip: This interface supports auto-completion, tab completion,
          command history (↑/↓), and works great on both desktop and mobile! Try
          clicking: <ClickableCommand command="about">about</ClickableCommand>,{" "}
          <ClickableCommand command="blog list">blog list</ClickableCommand>, or{" "}
          <ClickableCommand command="projects list">
            projects list
          </ClickableCommand>
        </div>
      </div>
    );

    // Show autocomplete on load
    const topLevelSuggestions = Object.keys(commandTree).map((cmd) => ({
      text: cmd,
      description: commandTree[cmd].description,
    }));
    setAutoCompleteItems(topLevelSuggestions);
    setShowAutoComplete(true);
    setSelectedAutoComplete(0);
  }, [addToHistory, processCommand]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <div className="ml-4 text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark text-sm">
          Portfolio Terminal
        </div>
      </div>

      {/* Terminal Content */}
      <div className="terminal-content" ref={terminalRef}>
        {/* Command History */}
        {history.map((line) => (
          <div
            key={line.id}
            className={`mb-2 ${
              line.type === "command" ? "terminal-prompt font-medium" : ""
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-terminal-accent-cyan rounded-full animate-pulse"></div>
            <div className="text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark text-sm">
              Processing...
            </div>
          </div>
        )}

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="terminal-prompt">user@site:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            placeholder="Type 'help' to get started"
            disabled={isProcessing || modalState.isOpen}
          />
        </div>

        {/* Auto-complete Suggestions */}
        {showAutoComplete && (
          <div className="mt-2 space-y-1">
            {autoCompleteItems.map((item, index) => (
              <div
                key={index}
                className={`autocomplete-chip ${
                  index === selectedAutoComplete
                    ? "bg-terminal-accent-blue/40"
                    : ""
                }`}
                onClick={() => {
                  setCurrentInput(item.text);
                  setShowAutoComplete(false);
                  inputRef.current?.focus();
                }}
              >
                <span className="font-medium">{item.text}</span>
                {item.description && (
                  <span className="text-xs text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark ml-2">
                    {item.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div ref={historyEndRef} />
      </div>

      {/* Vim Modal */}
      <VimModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
        type={modalState.type}
        metadata={modalState.metadata}
      />
    </div>
  );
}
