"use client";
import React from "react";
import { useAccessibility } from "./AccessibilityContext";
import { motion } from "framer-motion";

export function AccessibilityToggle() {
  const { reducedChromatic, toggleReducedChromatic } = useAccessibility();
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleReducedChromatic}
      aria-pressed={reducedChromatic}
      aria-label={
        reducedChromatic
          ? "Disable simplified colors"
          : "Enable simplified colors"
      }
      className="pixel-border glow-cyan/0 hover:glow-cyan/30 group text-retro-cyan focus:ring-retro-yellow relative flex h-8 w-8 items-center justify-center rounded-sm bg-[#12162b]/80 transition focus:ring-2 focus:outline-none"
    >
      <span className="sr-only">
        {reducedChromatic
          ? "Disable simplified colors"
          : "Enable simplified colors"}
      </span>
      {/* Icon: palette / slash */}
      {reducedChromatic ? (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a9 9 0 1 0 9 9" />
          <path d="M21 3 3 21" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a9 9 0 0 0 0 18c.9 0 1.5-.6 1.5-1.5S12.6 18 12 18h-1.5" />
          <circle cx="6.5" cy="12.5" r="1.5" />
          <circle cx="9.5" cy="7.5" r="1.5" />
          <circle cx="14.5" cy="7.5" r="1.5" />
          <circle cx="17.5" cy="12.5" r="1.5" />
        </svg>
      )}
    </motion.button>
  );
}
