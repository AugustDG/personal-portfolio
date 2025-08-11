"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { BlogPost } from "@/lib/directus";

export default function BlogIndex() {
  const { data: posts, isLoading, error } = useApi<BlogPost[]>("/api/blog");
  return (
    <div className="space-y-10">
      <h1 className="font-pixel text-3xl font-semibold tracking-tight">
        <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
          Blog
        </span>
        <span className="from-retro-magenta via-retro-purple/60 mt-4 block h-1 w-48 bg-linear-to-r to-transparent" />
      </h1>
      <ul className="space-y-3">
        {isLoading && (
          <li className="text-retro-cyan text-sm opacity-70">Loading…</li>
        )}
        {error && (
          <li className="text-retro-magenta text-sm">Failed to load.</li>
        )}
        {(posts || []).map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            whileHover={{ x: 4 }}
            className="group border-retro-purple/40 hover:border-retro-magenta relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
          >
            <Link href={`/blog/${p.slug}`} className="block space-y-2 p-4">
              <h2 className="text-retro-magenta group-hover:text-retro-yellow font-semibold tracking-wide transition-colors">
                {p.title}
              </h2>
              <p className="text-retro-cyan/90 line-clamp-2 text-xs leading-relaxed opacity-80 md:text-[13px]">
                {p.excerpt}
              </p>
            </Link>
          </motion.li>
        ))}
        {!isLoading && !error && (!posts || posts.length === 0) && (
          <li className="opacity-60">No posts yet.</li>
        )}
      </ul>
    </div>
  );
}
