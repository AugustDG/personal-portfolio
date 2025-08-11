"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { Project } from "@/lib/directus";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    error,
  } = useApi<Project[]>("/api/projects");
  const featured = (projects || []).filter((p) => p.featured);
  const others = (projects || []).filter((p) => !p.featured);
  return (
    <div className="space-y-14">
      <section>
        <h1 className="font-pixel mb-8 text-3xl font-semibold tracking-tight">
          <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
            Projects
          </span>
          <span className="from-retro-magenta via-retro-purple/60 mt-4 block h-1 w-64 bg-linear-to-r to-transparent" />
        </h1>
        <h2 className="font-pixel mb-6 flex items-center gap-3 text-2xl">
          <span className="bg-retro-yellow px-3 py-1 font-semibold text-black shadow-[0_0_0_2px_#ffe600,4px_4px_0_0_#ff00ff]">
            Featured Projects
          </span>
          <span className="from-retro-yellow via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <p className="text-retro-cyan text-sm opacity-70">Loading…</p>
          )}
          {error && (
            <p className="text-retro-magenta text-sm">Failed to load.</p>
          )}
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group border-retro-purple/40 hover:border-retro-magenta relative block overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
              >
                <div className="from-retro-magenta/10 via-retro-purple/0 to-retro-cyan/10 pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 space-y-2 p-4">
                  <h3 className="text-retro-magenta text-sm font-semibold tracking-wide md:text-base">
                    {p.title}
                  </h3>
                  <p className="text-retro-cyan/90 line-clamp-3 text-xs leading-relaxed md:text-[13px]">
                    {p.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
          {!featured.length && (
            <p className="opacity-60">No featured projects yet.</p>
          )}
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="font-pixel flex items-center gap-3 text-2xl">
          <span className="bg-retro-teal px-3 py-1 font-semibold text-black shadow-[0_0_0_2px_#00fff6,4px_4px_0_0_#ff00ff]">
            All
          </span>
          <span className="from-retro-teal via-retro-cyan h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <ul className="space-y-3">
          {isLoading && (
            <li className="text-retro-cyan text-sm opacity-70">Loading…</li>
          )}
          {error && (
            <li className="text-retro-magenta text-sm">Failed to load.</li>
          )}
          {others.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i + 0.2, duration: 0.35 }}
              whileHover={{ x: 4 }}
              className="group border-retro-purple/40 hover:border-retro-magenta relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center"
              >
                <span className="text-retro-magenta group-hover:text-retro-yellow flex-1 font-semibold tracking-wide transition-colors">
                  {p.title}
                </span>
                <span className="text-retro-cyan/90 line-clamp-1 flex-2 text-xs opacity-80">
                  {p.description}
                </span>
              </Link>
            </motion.li>
          ))}
          {!others.length && <li className="opacity-60">No other projects.</li>}
        </ul>
      </section>
    </div>
  );
}
