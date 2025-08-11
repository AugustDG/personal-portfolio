"use client";
import { useState } from "react";
import { useSearch } from "./SearchContext";

export function SearchTrigger() {
  const { setQuery, results } = useSearch();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="pixel-border glow-magenta bg-retro-magenta text-white px-3 py-2 hover:bg-retro-purple transition-colors"
      >
        SEARCH
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 pixel-border bg-retro-beige p-3 space-y-2">
          <input
            autoFocus
            placeholder="Search..."
            className="w-full pixel-border px-2 py-1 bg-[#0d0f17] text-retro-cyan placeholder-retro-purple focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="max-h-64 overflow-auto space-y-1 text-xs font-mono text-retro-brown">
            {results.map((r) => (
              <li
                key={r.id}
                className="pixel-border p-2 bg-[#12162b] text-retro-brown hover:bg-retro-purple/40 transition-colors"
              >
                <span className="font-bold text-retro-magenta">{r.title}</span>
                <span className="block opacity-70 text-retro-cyan">
                  {r.type}
                </span>
              </li>
            ))}
            {!results.length && <li className="opacity-60">No results</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
