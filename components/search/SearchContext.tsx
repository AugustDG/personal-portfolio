"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import MiniSearch, { SearchResult } from "minisearch";

interface IndexedDoc {
  id: string;
  type: "project" | "blog" | "gallery";
  title: string;
  body: string;
  tags?: string[];
  color?: string;
  image?: string;
  slug: string;
}

interface SearchContextValue {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  addDocuments: (docs: IndexedDoc[]) => void;
  indexed: boolean;
  setIndexed: (v: boolean) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

let mini: MiniSearch | null = null;

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(0);
  const [indexed, setIndexed] = useState(false);

  if (!mini) {
    mini = new MiniSearch({
      fields: ["title", "body", "tags"],
      storeFields: ["title", "type", "slug", "color", "image"],
      searchOptions: { prefix: true, fuzzy: 0.2 },
    });
  }

  const results = useMemo(
    () => (query ? mini!.search(query) : []),
    [query, version],
  );

  function addDocuments(docs: IndexedDoc[]) {
    mini!.addAll(docs);
    setVersion((v) => v + 1);
  }

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, addDocuments, indexed, setIndexed }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
