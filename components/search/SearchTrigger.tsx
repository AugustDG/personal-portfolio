"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "./SearchContext";

export function SearchTrigger() {
  const { setQuery, results } = useSearch();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -2 }}
        onClick={() => setOpen((o) => !o)}
        className="pixel-border glow-magenta bg-retro-magenta hover:bg-retro-purple px-3 py-2 text-white transition-colors"
      >
        SEARCH
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="pixel-border bg-retro-beige absolute right-0 mt-2 w-72 space-y-2 p-3"
          >
            <input
              autoFocus
              placeholder="Search..."
              className="pixel-border bg-retro-beige text-retro-cyan placeholder-retro-purple w-full px-2 py-1 focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="text-retro-brown max-h-64 space-y-1 overflow-auto font-mono text-xs">
              {results.map((r) => (
                <li
                  key={r.id}
                  className="pixel-border text-retro-brown hover:bg-retro-purple/40 bg-[#12162b] p-2 transition-colors"
                >
                  <span className="text-retro-magenta font-bold">
                    {r.title}
                  </span>
                  <span className="text-retro-cyan block opacity-70">
                    {r.type}
                  </span>
                </li>
              ))}
              {!results.length && <li className="opacity-60">No results</li>}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
