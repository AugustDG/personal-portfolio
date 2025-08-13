import Link from "next/link";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { getProjects } from "@/lib/directus";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/projects`;
  return {
    title: "Projects – Augusto Pinheiro",
    description: "Selected software projects, side quests and experiments.",
    alternates: {
      canonical,
      types: { "application/rss+xml": "/projects/rss.xml" },
    },
    openGraph: {
      type: "website",
      title: "Projects – Augusto Pinheiro",
      description: "Selected software projects, side quests and experiments.",
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: "Projects – Augusto Pinheiro",
      description: "Selected software projects, side quests and experiments.",
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <div className="space-y-14">
      <section>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-pixel text-3xl font-semibold tracking-tight">
            <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
              Projects
            </span>
            <span className="from-retro-magenta via-retro-purple/60 mt-4 block h-1 w-64 bg-linear-to-r to-transparent" />
          </h1>
          <div>
            <a
              href="/projects/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="border-retro-magenta/60 text-retro-magenta hover:border-retro-yellow hover:text-retro-yellow focus:ring-retro-yellow/70 inline-flex items-center gap-1 rounded-sm border bg-[#1b2140] px-3 py-1 font-mono text-[11px] tracking-wide uppercase shadow-[0_0_0_2px_#ff00ff,3px_3px_0_0_#00fff6] transition hover:shadow-[0_0_0_2px_#ffe600,3px_3px_0_0_#ff00ff] focus:ring-2 focus:outline-none"
              aria-label="Subscribe to Projects RSS feed"
            >
              <span className="hidden sm:inline">Subscribe</span>
              <span className="sm:hidden">RSS</span>
              <span aria-hidden>📡</span>
            </a>
          </div>
        </div>
        <h2 className="font-pixel mb-6 flex items-center gap-3 text-2xl">
          <span className="bg-retro-yellow px-3 py-1 font-semibold text-black shadow-[0_0_0_2px_#ffe600,4px_4px_0_0_#ff00ff]">
            Featured Projects
          </span>
          <span className="from-retro-yellow via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <StaggerItem index={i} key={p.id}>
              <div className="group border-retro-purple/40 hover:border-retro-magenta relative block overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
                <Link
                  href={`/projects/${p.slug}`}
                  className="relative z-10 block space-y-2 p-4"
                >
                  <h3 className="text-retro-magenta group-hover:text-retro-yellow text-sm font-semibold tracking-wide transition-colors md:text-base">
                    {p.title}
                  </h3>
                  <p className="text-retro-cyan/90 line-clamp-3 text-xs leading-relaxed md:text-[13px]">
                    {p.description}
                  </p>
                </Link>
              </div>
            </StaggerItem>
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
          {others.map((p, i) => (
            <StaggerItem index={i} key={p.id} as="li">
              <div className="group border-retro-purple/40 hover:border-retro-magenta relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
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
              </div>
            </StaggerItem>
          ))}
          {!others.length && <li className="opacity-60">No other projects.</li>}
        </ul>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Projects",
            itemListElement: projects.map((p, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `/projects/${p.slug}`,
              name: p.title,
            })),
          }),
        }}
      />
    </div>
  );
}
