"use client";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { Project, BlogPost, Gallery } from "@/lib/directus";
import Link from "next/link";

export default function HomePage() {
  const {
    data: projects,
    isLoading,
    error,
  } = useApi<Project[]>("/api/projects");
  const { data: posts } = useApi<BlogPost[]>("/api/blog");
  const { data: galleries } = useApi<Gallery[]>("/api/galleries");
  const featured = (projects || []).filter((p) => p.featured).slice(0, 3);
  const featuredPosts = (posts || [])
    .slice()
    .sort(
      (a: any, b: any) =>
        (b.date || b.created_at || 0) - (a.date || a.created_at || 0),
    )
    .slice(0, 3);
  const featuredGalleries = (galleries || []).slice(0, 3);
  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-pixel relative mb-6 inline-block text-3xl font-semibold tracking-tight md:text-4xl">
          <span className="from-retro-magenta via-retro-yellow to-retro-cyan relative z-10 bg-linear-to-r bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
            Hi, I'm Augusto
          </span>
          <span className="from-retro-magenta via-retro-purple mt-3 block h-1 w-56 bg-linear-to-r to-transparent"></span>
        </h1>
        <p className="mt-4 max-w-prose leading-relaxed">
          Retro-inspired colorful portfolio. Explore featured projects, dive
          into detailed write-ups, browse photography galleries, and read the
          blog.
        </p>
      </section>
      <section>
        <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
          <span className="bg-retro-purple px-3 py-1 font-semibold text-white shadow-[0_0_0_2px_#9d4bff,4px_4px_0_0_#ff00ff]">
            Featured
          </span>
          <span className="from-retro-purple via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && (
            <div className="text-retro-cyan text-sm opacity-70">Loading…</div>
          )}
          {error && (
            <div className="text-retro-magenta text-sm">Failed to load.</div>
          )}
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group border-retro-purple/40 hover:border-retro-magenta relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
            >
              <Link href={`/projects/${p.slug}`} className="block">
                <div className="from-retro-magenta/10 via-retro-purple/0 to-retro-cyan/10 pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 space-y-2 p-4">
                  <h3 className="text-retro-magenta group-hover:text-retro-yellow text-sm font-semibold tracking-wide transition-colors md:text-base">
                    {p.title}
                  </h3>
                  <p className="text-retro-cyan/90 line-clamp-4 text-xs leading-relaxed md:text-[13px]">
                    {p.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
          {!featured.length && (
            <p className="opacity-60">No featured projects yet.</p>
          )}
        </div>
      </section>
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
            <span className="bg-retro-magenta px-3 py-1 font-semibold text-white shadow-[0_0_0_2px_#ffffff,4px_4px_0_0_#ff00ff]">
              Latest Posts
            </span>
            <span className="from-retro-magenta via-retro-cyan h-[2px] flex-1 bg-linear-to-r to-transparent" />
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="group border-retro-purple/40 hover:border-retro-cyan relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
              >
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="from-retro-cyan/10 via-retro-purple/0 to-retro-magenta/10 pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 space-y-2 p-4">
                    <h3 className="text-retro-cyan group-hover:text-retro-yellow text-sm font-semibold tracking-wide transition-colors md:text-base">
                      {p.title}
                    </h3>
                    <p className="text-retro-cyan/90 line-clamp-4 text-xs leading-relaxed md:text-[13px]">
                      {p.body.slice(0, 140)}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}
      {featuredGalleries.length > 0 && (
        <section>
          <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
            <span className="bg-retro-yellow px-3 py-1 font-semibold text-black shadow-[0_0_0_2px_#ffffff,4px_4px_0_0_#ff00ff]">
              Galleries
            </span>
            <span className="from-retro-yellow via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGalleries.map((g, i) => (
              <motion.article
                key={g.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="group border-retro-purple/40 hover:border-retro-yellow relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
              >
                <Link
                  href={`/galleries/${g.slug}`}
                  className="block space-y-2 p-4"
                >
                  <h3 className="text-retro-magenta group-hover:text-retro-yellow text-sm font-semibold tracking-wide transition-colors md:text-base">
                    {g.title}
                  </h3>
                  <p className="text-retro-cyan/90 text-xs leading-relaxed md:text-[13px]">
                    {g.images?.length || 0} images
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
