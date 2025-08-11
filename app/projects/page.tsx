import { getProjects } from "@/lib/directus";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <div className="space-y-14 animate-fadeIn">
      <section>
        <h1 className="font-pixel text-3xl mb-8 font-semibold tracking-tight">
          <span className="bg-linear-to-r from-retro-magenta via-retro-yellow to-retro-cyan bg-clip-text text-transparent">
            Projects
          </span>
          <span className="block h-1 mt-4 w-64 bg-linear-to-r from-retro-magenta via-retro-purple/60 to-transparent" />
        </h1>
        <h2 className="font-pixel text-2xl mb-6 flex items-center gap-3">
          <span className="bg-retro-yellow text-black px-3 py-1 font-semibold shadow-[0_0_0_2px_#ffe600,4px_4px_0_0_#ff00ff]">
            Featured
          </span>
          <span className="flex-1 h-[2px] bg-linear-to-r from-retro-yellow via-retro-magenta to-transparent" />
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.id}
              className="group relative bg-[#12162b] border border-retro-purple/40 hover:border-retro-magenta transition-colors rounded-sm overflow-hidden block"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-linear-to-br from-retro-magenta/10 via-retro-purple/0 to-retro-cyan/10" />
              <div className="p-4 relative z-10 space-y-2">
                <h3 className="font-semibold text-retro-magenta text-sm md:text-base tracking-wide">
                  {p.title}
                </h3>
                <p className="text-xs md:text-[13px] leading-relaxed line-clamp-3 text-retro-cyan/90">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
          {!featured.length && (
            <p className="opacity-60">No featured projects yet.</p>
          )}
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="font-pixel text-2xl flex items-center gap-3">
          <span className="bg-retro-teal text-black px-3 py-1 font-semibold shadow-[0_0_0_2px_#00fff6,4px_4px_0_0_#ff00ff]">
            All
          </span>
          <span className="flex-1 h-[2px] bg-linear-to-r from-retro-teal via-retro-cyan to-transparent" />
        </h2>
        <ul className="space-y-3">
          {others.map((p) => (
            <li
              key={p.id}
              className="group relative bg-[#12162b] border border-retro-purple/40 hover:border-retro-magenta transition-colors rounded-sm overflow-hidden"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="flex flex-col sm:flex-row sm:items-center gap-2 p-4"
              >
                <span className="font-semibold flex-1 text-retro-magenta tracking-wide group-hover:text-retro-yellow transition-colors">
                  {p.title}
                </span>
                <span className="text-xs opacity-80 line-clamp-1 flex-2 text-retro-cyan/90">
                  {p.description}
                </span>
              </Link>
            </li>
          ))}
          {!others.length && <li className="opacity-60">No other projects.</li>}
        </ul>
      </section>
    </div>
  );
}
