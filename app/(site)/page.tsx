import { getProjects } from "@/lib/directus";

export default async function HomePage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  return (
    <div className="space-y-10 animate-fadeIn">
      <section>
        <h1 className="font-pixel text-2xl mb-4 pixel-border inline-block bg-retro-magenta text-white px-4 py-3">
          Hi, I'm Augusto
        </h1>
        <p className="max-w-prose leading-relaxed mt-4 font-mono">
          Retro-inspired colorful portfolio. Explore featured projects, dive
          into detailed write-ups, browse photography galleries, and read the
          blog.
        </p>
      </section>
      <section>
        <h2 className="font-pixel text-xl mb-3">Featured Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <article
              key={p.id}
              className="pixel-border bg-white p-4 hover:bg-retro-yellow transition-colors"
            >
              <h3 className="font-bold mb-2">{p.title}</h3>
              <p className="text-xs line-clamp-4">{p.description}</p>
            </article>
          ))}
          {!featured.length && (
            <p className="opacity-60">No featured projects yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
