"use client";
import { useEffect } from "react";
import { useSearch } from "./SearchContext";

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);

    if (!res.ok) return null;
    const data = await res.json();

    return (data.data as T) || null;
  } catch {
    return null;
  }
}

export function SearchIndexer() {
  const { addDocuments, indexed, setIndexed } = useSearch();
  useEffect(() => {
    if (indexed) return;
    (async () => {
      const [projects, posts, photos] = await Promise.all([
        fetchJson<any[]>("/api/projects"),
        fetchJson<any[]>("/api/blog"),
        fetchJson<any[]>("/api/photos"),
      ]);
      const docs = [
        ...(projects || []).map((p) => ({
          id: `project-${p.id}`,
          type: "project" as const,
          title: p.title,
          body: p.description || p.body || "",
          tags: p.tags || [],
          slug: p.slug,
        })),
        ...(posts || []).map((b) => ({
          id: `blog-${b.id}`,
          type: "blog" as const,
          title: b.title,
          body: b.excerpt || b.body?.slice(0, 500) || "",
          tags: b.tags || [],
          slug: b.slug,
        })),
        ...(photos || []).map((g) => ({
          id: `photos-${g.id}`,
          type: "photos" as const,
          title: g.title,
          body: (g.images || []).map((im: any) => im.description).join(" "),
          slug: g.slug,
          tags: g.tags || [],
        })),
      ];
      addDocuments(docs);
      setIndexed(true);
    })();
  }, [addDocuments, indexed, setIndexed]);

  return null;
}
