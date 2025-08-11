"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { Gallery } from "@/lib/directus";

export default function GalleriesPage() {
  const {
    data: galleries,
    isLoading,
    error,
  } = useApi<Gallery[]>("/api/galleries");
  return (
    <div className="space-y-10">
      <h1 className="font-pixel text-3xl font-semibold tracking-tight">
        <span className="from-retro-yellow via-retro-orange to-retro-magenta bg-linear-to-r bg-clip-text text-transparent">
          Galleries
        </span>
        <span className="from-retro-yellow via-retro-magenta/60 mt-4 block h-1 w-56 bg-linear-to-r to-transparent" />
      </h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <li className="text-retro-cyan text-sm opacity-70">Loading…</li>
        )}
        {error && (
          <li className="text-retro-magenta text-sm">Failed to load.</li>
        )}
        {(galleries || []).map((g, i) => (
          <motion.li
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ y: -4 }}
            className="group border-retro-purple/40 hover:border-retro-yellow relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
          >
            <Link href={`/galleries/${g.slug}`} className="block space-y-1 p-4">
              <h2 className="text-retro-magenta group-hover:text-retro-yellow mb-1 font-semibold tracking-wide transition-colors">
                {g.title}
              </h2>
              <p className="text-retro-cyan/90 text-xs opacity-80">
                {g.images?.length || 0} images
              </p>
            </Link>
          </motion.li>
        ))}
        {!isLoading && !error && (!galleries || galleries.length === 0) && (
          <li className="opacity-60">No galleries yet.</li>
        )}
      </ul>
    </div>
  );
}
