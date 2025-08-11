import { getProjects } from "@/lib/directus";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <div className="space-y-10 animate-fadeIn">
      <section>
        <h1 className="font-pixel text-2xl mb-4">Projects</h1>
        <h2 className="font-pixel text-xl mb-3">Featured</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.id}
              className="pixel-border bg-white p-4 hover:bg-retro-teal/30 transition-colors block"
            >
              <h3 className="font-bold mb-2">{p.title}</h3>
              <p className="text-xs line-clamp-3">{p.description}</p>
            </Link>
          ))}
          {!featured.length && (
            <p className="opacity-60">No featured projects yet.</p>
          )}
        </div>
      </section>
      <section>
        <h2 className="font-pixel text-xl mb-3">All Projects</h2>
        <ul className="space-y-2">
          {others.map((p) => (
            <li
              key={p.id}
              className="pixel-border bg-white hover:bg-retro-yellow/40 transition-colors"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="flex flex-col sm:flex-row sm:items-center gap-2 p-4"
              >
                <span className="font-bold flex-1">{p.title}</span>
                <span className="text-xs opacity-70 line-clamp-1 flex-[2]">
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
