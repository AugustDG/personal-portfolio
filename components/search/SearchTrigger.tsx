"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "./SearchContext";
import Link from "next/link";

export function SearchTrigger() {
  const { setQuery, results, open, setOpen, query } = useSearch();

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -2 }}
        onClick={() => setOpen(!open)}
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
              value={query}
              className="pixel-border bg-retro-beige text-retro-cyan placeholder-retro-purple w-full px-2 py-1 focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="text-retro-brown divide-retro-purple/30 max-h-72 divide-y overflow-auto font-mono text-xs">
              {results.map((r) => {
                const href = `/${r.type === "blog" ? "blog" : r.type === "project" ? "projects" : "photos"}/${r.slug}`;
                return (
                  <li key={r.id}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="hover:bg-retro-purple/30 block space-y-1 p-2 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-retro-magenta font-semibold tracking-wide">
                          {r.title}
                        </span>
                        <span className="border-retro-purple/50 text-retro-cyan rounded border px-1 py-[1px] text-[10px] uppercase">
                          {r.type}
                        </span>
                      </div>
                      {r.body && (
                        <p className="text-retro-brown/70 line-clamp-2 text-[10px] leading-snug">
                          {String(r.body).slice(0, 120)}
                        </p>
                      )}
                    </Link>
                  </li>
                );
              })}
              {!results.length && (
                <li className="p-2 text-[10px] opacity-60">No results</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
