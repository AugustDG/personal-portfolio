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
        className="pixel-border bg-retro-magenta text-white px-3 py-2"
      >
        SEARCH
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 pixel-border bg-retro-beige p-3 space-y-2">
          <input
            autoFocus
            placeholder="Search..."
            className="w-full pixel-border px-2 py-1 bg-white"
            onChange={(e) => setQuery(e.target.value)}
          />
          <ul className="max-h-64 overflow-auto space-y-1 text-xs font-mono">
            {results.map((r) => (
              <li
                key={r.id}
                className="pixel-border p-2 bg-white hover:bg-retro-yellow transition-colors"
              >
                <span className="font-bold">{r.title}</span>
                <span className="block opacity-60">{r.type}</span>
              </li>
            ))}
            {!results.length && <li className="opacity-60">No results</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
