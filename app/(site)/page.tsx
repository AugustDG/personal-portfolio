import { getProjects } from "@/lib/directus";

export default async function HomePage() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  return (
    <div className="space-y-12 animate-fadeIn">
      <section>
        <h1 className="font-pixel text-3xl md:text-4xl mb-6 inline-block font-semibold tracking-tight relative">
          <span className="relative z-10 bg-gradient-to-r from-retro-magenta via-retro-yellow to-retro-cyan bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
            Hi, I'm Augusto
          </span>
          <span className="block h-1 mt-3 w-56 bg-gradient-to-r from-retro-magenta via-retro-purple to-transparent"></span>
        </h1>
        <p className="max-w-prose leading-relaxed mt-4">
          Retro-inspired colorful portfolio. Explore featured projects, dive
          into detailed write-ups, browse photography galleries, and read the
          blog.
        </p>
      </section>
      <section>
        <h2 className="font-pixel text-2xl mb-5 tracking-tight flex items-center gap-3">
          <span className="bg-retro-purple text-white px-3 py-1 font-semibold shadow-[0_0_0_2px_#9d4bff,4px_4px_0_0_#ff00ff]">
            Featured
          </span>
          <span className="flex-1 h-[2px] bg-gradient-to-r from-retro-purple via-retro-magenta to-transparent" />
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <article
              key={p.id}
              className="group relative bg-[#12162b] border border-retro-purple/40 hover:border-retro-magenta transition-colors rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-retro-magenta/10 via-retro-purple/0 to-retro-cyan/10" />
              <div className="p-4 relative z-10 space-y-2">
                <h3 className="font-semibold text-retro-magenta text-sm md:text-base tracking-wide">
                  {p.title}
                </h3>
                <p className="text-xs md:text-[13px] leading-relaxed line-clamp-4 text-retro-cyan/90">
                  {p.description}
                </p>
              </div>
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
