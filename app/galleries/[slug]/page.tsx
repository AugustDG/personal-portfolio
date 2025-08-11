"use client";
import { TagPill } from "@/components/TagPill";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { Gallery } from "@/lib/directus";
import { PageProps } from "@/lib/types";
import React from "react";

export default function GalleryPage({ params }: { params: PageProps }) {
  const { slug } = React.use(params);
  const {
    data: gallery,
    isLoading,
    error,
  } = useApi<Gallery>(`/api/galleries/${slug}`);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {isLoading && (
          <p className="text-retro-cyan text-sm opacity-70">Loading…</p>
        )}
        {error && <p className="text-retro-magenta text-sm">Failed to load.</p>}
        {!isLoading && !error && !gallery && (
          <p className="opacity-60">Not found.</p>
        )}
        {gallery && (
          <>
            <h1 className="font-pixel pixel-border glow-yellow from-retro-yellow via-retro-orange to-retro-magenta inline-block bg-linear-to-br px-4 py-3 text-3xl text-black">
              {gallery.title}
            </h1>
            {Array.isArray(gallery.tags) && gallery.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {gallery.tags.map((t: string) => (
                  <TagPill key={t} tag={t} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {gallery && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.images?.map((img, i) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.03 * i, duration: 0.35 }}
              whileHover={{ scale: 1.02 }}
              className="pixel-border hover:bg-retro-purple/30 overflow-hidden bg-[#12162b] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.description || ""}
                className="h-48 w-full object-cover"
              />
              {img.description && (
                <figcaption className="text-retro-cyan p-2 font-mono text-xs opacity-80">
                  {img.description}
                </figcaption>
              )}
            </motion.figure>
          ))}
          {!gallery.images?.length && (
            <p className="opacity-60">No images yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
