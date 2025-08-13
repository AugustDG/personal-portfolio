"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { BlogPost } from "@/lib/directus";

export default function BlogIndex() {
  const { data: posts, isLoading, error } = useApi<BlogPost[]>("/api/blog");
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-pixel text-3xl font-semibold tracking-tight">
          <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
            Blog
          </span>
          <span className="from-retro-magenta via-retro-purple/60 mt-4 block h-1 w-48 bg-linear-to-r to-transparent" />
        </h1>
        <div>
          <a
            href="/blog/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="border-retro-magenta/60 text-retro-magenta hover:border-retro-yellow hover:text-retro-yellow focus:ring-retro-yellow/70 inline-flex items-center gap-1 rounded-sm border bg-[#1b2140] px-3 py-1 font-mono text-[11px] tracking-wide uppercase shadow-[0_0_0_2px_#ff00ff,3px_3px_0_0_#00fff6] transition hover:shadow-[0_0_0_2px_#ffe600,3px_3px_0_0_#ff00ff] focus:ring-2 focus:outline-none"
            aria-label="Subscribe to Blog RSS feed"
          >
            <span className="hidden sm:inline">Subscribe</span>
            <span className="sm:hidden">RSS</span>
            <span aria-hidden>📡</span>
          </a>
        </div>
      </div>
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
              <p className="text-retro-cyan/70 font-mono text-[10px] md:text-[11px]">
                {p.published_at || p.updated_at}
              </p>
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
