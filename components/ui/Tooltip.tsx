"use client";
import React, { ReactNode, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayMs?: number;
}

export function Tooltip({
  label,
  children,
  side = "top",
  delayMs = 180,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches;

  const show = () => {
    if (isTouch) return; // suppress on mobile
    timer.current = window.setTimeout(() => setOpen(true), delayMs);
  };

  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={() => setOpen(true)}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {open && !isTouch && (
          <motion.span
            initial={{ opacity: 0, y: side === "top" ? 4 : -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === "top" ? 4 : -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className="text-retro-brown ring-retro-purple/40 pointer-events-none absolute z-40 rounded bg-[#12162b] px-2 py-1 font-mono text-[10px] whitespace-nowrap shadow-lg ring-1"
            style={{
              top: side === "top" ? 0 : undefined,
              bottom: side === "bottom" ? 0 : undefined,
              left: "50%",
              transform:
                side === "top"
                  ? "translate(-50%, -100%)"
                  : side === "bottom"
                    ? "translate(-50%, 100%)"
                    : "translate(-50%, -100%)",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
