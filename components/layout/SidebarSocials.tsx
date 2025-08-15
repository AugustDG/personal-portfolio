import { getSiteMeta, getProjects, getBlogs, getPhotoGalleries } from '@/lib/directus';

export default async function SidebarSocials() {
  // Fetch all sidebar data in parallel for performance
  const [site, projects, blogs, galleries] = await Promise.all([
    getSiteMeta(),
    getProjects(),
    getBlogs(),
    getPhotoGalleries(),
  ]);

  const featuredProjects = (projects || []).filter((p) => p.featured).slice(0, 4);
  const latestPosts = (blogs || []).slice(0, 4);

  // Pick 6 random galleries and one random image from each
  const galleriesWithImages = (galleries || []).filter(
    (g) => Array.isArray(g.images) && g.images.length > 0,
  );
  const shuffled = [...galleriesWithImages].sort(() => Math.random() - 0.5);
  const recentPhotos = shuffled.slice(0, 6).map((g) => {
    const img = g.images[Math.floor(Math.random() * g.images.length)];
    return { img, slug: g.slug };
  });

  return (
    <aside className="hidden flex-col gap-8 pt-2 text-xs tracking-wide lg:flex">
      {/* Featured Projects */}
      <div>
        <p className="font-pixel text-retro-yellow mb-2 text-[10px]">FEATURED PROJECTS</p>
        {featuredProjects.length ? (
          <ul className="space-y-1 font-mono">
            {featuredProjects.map((p) => (
              <li key={p.id}>
                <a
                  href={`/projects/${p.slug}`}
                  className="group hover:text-retro-magenta inline-flex items-start gap-1"
                >
                  <span className="text-retro-magenta/60 group-hover:text-retro-magenta">
                    »
                  </span>
                  <span className="line-clamp-1">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono opacity-60">No featured projects.</p>
        )}
      </div>

      {/* Latest Blog Posts */}
      <div>
        <p className="font-pixel text-retro-yellow mb-2 text-[10px]">LATEST POSTS</p>
        {latestPosts.length ? (
          <ul className="space-y-1 font-mono">
            {latestPosts.map((b) => (
              <li key={b.id}>
                <a
                  href={`/blog/${b.slug}`}
                  className="group hover:text-retro-cyan inline-flex items-start gap-1"
                >
                  <span className="text-retro-cyan/60 group-hover:text-retro-cyan">
                    »
                  </span>
                  <span className="line-clamp-1">{b.title}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono opacity-60">No posts yet.</p>
        )}
      </div>

      {/* Recent Photos */}
      <div>
        <p className="font-pixel text-retro-yellow mb-2 text-[10px]">PHOTOS</p>
        {recentPhotos.length ? (
          <div className="grid grid-cols-3 gap-2">
            {recentPhotos.map(({ img, slug }) => (
              <a
                key={img.id}
                href={`/photos/${slug}`}
                className="group border-retro-purple/40 relative block aspect-square overflow-hidden rounded-sm border bg-[#111729]"
              >
                {img.thumbnail_url || img.src_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.thumbnail_url || img.src_url}
                    alt={img.description || 'Photo'}
                    className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-[8px] opacity-40">
                    N/A
                  </div>
                )}
                <span className="from-retro-magenta/0 via-retro-magenta/0 to-retro-cyan/10 pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-0 mix-blend-screen transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
        ) : (
          <p className="font-mono opacity-60">No photos.</p>
        )}
      </div>

      {/* Social */}
      <div>
        <p className="font-pixel text-retro-yellow mb-2 text-[10px]">SOCIAL</p>
        <ul className="space-y-1 font-mono">
          {site?.socials?.length ? (
            site.socials.map((s: any) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-retro-yellow"
                >
                  {s.label}
                </a>
              </li>
            ))
          ) : (
            <li className="opacity-60">No socials</li>
          )}
        </ul>
      </div>

      <div className="mt-auto font-mono opacity-60">
        Augusto M. Pinheiro © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
