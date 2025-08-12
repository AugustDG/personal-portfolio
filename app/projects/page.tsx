import Link from "next/link";
import { getProjects } from "@/lib/directus";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/projects`;
  return {
    title: "Projects – Augusto Pinheiro",
    description: "Selected software projects, side quests and experiments.",
    alternates: { canonical },
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
          {featured.map((p) => (
            <div
              key={p.id}
              className="group border-retro-purple/40 hover:border-retro-magenta relative block overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
            >
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
          {others.map((p) => (
            <li
              key={p.id}
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
            </li>
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
