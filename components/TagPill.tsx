"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useSearch } from "@/components/search/SearchContext";

interface TagPillProps {
  tag: string;
  className?: string;
}

// Unified neon tag pill styling
export function TagPill({ tag, className }: TagPillProps) {
  const { setQuery, setOpen } = useSearch();

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setQuery(tag);
        setOpen(true);
      }}
      className={clsx(
        "inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wide uppercase",
        "border-retro-purple/40 text-retro-cyan hover:border-retro-magenta hover:text-retro-yellow focus:ring-retro-magenta/60 bg-[#12162b] transition-colors focus:ring-2 focus:outline-none",
        className,
      )}
      aria-label={`Search for tag ${tag}`}
    >
      {tag}
    </motion.button>
  );
}
