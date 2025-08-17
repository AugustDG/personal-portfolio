import Link from 'next/link';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { getProjects, getBlogs, getPhotoGalleries, getSiteMeta } from '@/lib/directus';
import type { Metadata } from 'next';
import Image from 'next/image';

export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, '') || '';
  const canonical = base || undefined;

  return {
    title: 'Augusto Pinheiro - Portfolio',
    description: 'Personal portfolio: projects, writing and photos by Augusto Pinheiro.',
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: 'Augusto Pinheiro - Portfolio',
      description: 'Projects, writing and photos by Augusto Pinheiro.',
      url: canonical,
    },
    twitter: {
      card: 'summary',
      title: 'Augusto Pinheiro - Portfolio',
      description: 'Projects, writing and photos by Augusto Pinheiro.',
    },
  };
}

export default async function HomePage() {
  const [projects, posts, photos, site] = await Promise.all([
    getProjects(),
    getBlogs(),
    getPhotoGalleries(),
    getSiteMeta(),
  ]);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 3); // already sorted desc by published_at
  const featuredPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="min-w-0 flex-1">
            <h1 className="font-pixel relative mb-6 inline-block text-6xl font-semibold tracking-tight md:text-4xl">
              <span className="from-retro-magenta via-retro-yellow to-retro-cyan relative z-10 bg-linear-to-r bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
                Hi, I&apos;m Augusto :)
              </span>
              <span className="from-retro-magenta via-retro-purple mt-3 block h-1 w-56 bg-linear-to-r to-transparent"></span>
            </h1>
            {site?.intro && (
              <p className="mt-4 leading-relaxed whitespace-pre-line">{site.intro}</p>
            )}
          </div>
          {site?.profile_image_thumbnail_url && (
            <div className="pixel-border relative mx-auto aspect-square w-40 shrink-0 overflow-hidden rounded-sm bg-[#12162b] shadow-md md:mx-0 md:w-56">
              <Image
                src={site.profile_image_thumbnail_url}
                alt={site.profile_image?.description || 'Profile photo'}
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-cover"
                priority={false}
              />
            </div>
          )}
        </div>
      </section>
      <section>
        <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
          <span className="bg-retro-purple px-3 py-1 font-semibold text-white shadow-[0_0_0_2px_#9d4bff,4px_4px_0_0_#ff00ff]">
            Featured Projects
          </span>
          <span className="from-retro-purple via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <StaggerItem index={i} key={p.id}>
              <article className="group border-retro-purple/40 hover:border-retro-magenta relative flex h-full flex-col overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
                <Link href={`/projects/${p.slug}`} className="flex h-full flex-col">
                  <div className="relative h-40 w-full overflow-hidden">
                    {p.header_image_thumbnail_url ? (
                      <>
                        <Image
                          src={p.header_image_thumbnail_url}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                          priority={i === 0}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="from-retro-magenta via-retro-purple to-retro-cyan h-full w-full bg-linear-to-br opacity-30" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-retro-magenta group-hover:text-retro-yellow line-clamp-2 text-sm font-semibold tracking-wide transition-colors md:text-base">
                      {p.title}
                    </h3>
                    <p className="text-retro-cyan/90 line-clamp-2 text-xs leading-relaxed md:text-[13px]">
                      {p.description}
                    </p>
                  </div>
                </Link>
              </article>
            </StaggerItem>
          ))}
          {!featuredProjects.length && (
            <p className="opacity-60">No featured projects yet.</p>
          )}
        </div>
      </section>
      <section>
        <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
          <span className="bg-retro-magenta px-3 py-1 font-semibold text-white shadow-[0_0_0_2px_#ffffff,4px_4px_0_0_#ff00ff]">
            Latest Posts
          </span>
          <span className="from-retro-magenta via-retro-cyan h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((p, i) => (
            <StaggerItem index={i} key={p.id}>
              <article className="group border-retro-purple/40 hover:border-retro-cyan relative flex h-full flex-col overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
                <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                  <div className="relative h-40 w-full overflow-hidden">
                    {p.header_image_thumbnail_url ? (
                      <>
                        <Image
                          src={p.header_image_thumbnail_url}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          priority={i === 0}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="from-retro-cyan via-retro-purple to-retro-magenta h-full w-full bg-linear-to-br opacity-30" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-retro-cyan group-hover:text-retro-yellow line-clamp-2 text-sm font-semibold tracking-wide transition-colors md:text-base">
                      {p.title}
                    </h3>
                    <p className="text-retro-cyan/90 line-clamp-2 text-xs leading-relaxed md:text-[13px]">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            </StaggerItem>
          ))}
          {!latestPosts.length && <p className="opacity-60">No posts yet.</p>}
        </div>
      </section>
      <section>
        <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
          <span className="bg-retro-yellow px-3 py-1 font-semibold text-black shadow-[0_0_0_2px_#ffffff,4px_4px_0_0_#ff00ff]">
            Photos
          </span>
          <span className="from-retro-yellow via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPhotos.map((g, i) => (
            <StaggerItem index={i} key={g.id}>
              <article className="group border-retro-purple/40 hover:border-retro-yellow relative flex h-full flex-col overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
                <Link href={`/photos/${g.slug}`} className="flex h-full flex-col">
                  <div className="relative h-40 w-full overflow-hidden">
                    {g.images?.[0]?.thumbnail_url ? (
                      <>
                        <Image
                          src={g.images[0].thumbnail_url!}
                          alt={g.images[0].description || g.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          priority={i === 0}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="from-retro-yellow via-retro-orange to-retro-magenta h-full w-full bg-linear-to-br opacity-30" />
                    )}
                  </div>
                  <div className="flex min-h-[96px] flex-1 flex-col p-4">
                    <h3 className="text-retro-magenta group-hover:text-retro-yellow line-clamp-2 text-sm font-semibold tracking-wide transition-colors md:text-base">
                      {g.title}
                    </h3>
                    <p className="text-retro-cyan/90 text-xs leading-relaxed md:text-[13px]">
                      {g.images?.length || 0} images
                    </p>
                  </div>
                </Link>
              </article>
            </StaggerItem>
          ))}
          {!featuredPhotos.length && <p className="opacity-60">No photos yet.</p>}
        </div>
      </section>
      <section>
        <h2 className="font-pixel mb-5 flex items-center gap-3 text-2xl tracking-tight">
          <span className="bg-retro-cyan px-3 py-1 font-semibold text-black shadow-[0_0_0_2px_#ffffff,4px_4px_0_0_#ff00ff]">
            Connect
          </span>
          <span className="from-retro-cyan via-retro-magenta h-[2px] flex-1 bg-linear-to-r to-transparent" />
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {site?.socials?.map((s: any, i: number) => (
            <StaggerItem index={i} key={s.url} as="li" hoverShift={false}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-border hover:bg-retro-purple/30 text-retro-cyan block rounded-sm bg-[#12162b] px-4 py-3 font-mono text-sm transition-colors"
              >
                {s.label}
              </a>
            </StaggerItem>
          ))}
        </ul>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Augusto Pinheiro Portfolio',
            url: process.env.PUBLIC_URL || undefined,
            description: 'Projects, writing and photos by Augusto Pinheiro.',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${process.env.PUBLIC_URL || ''}/?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </div>
  );
}
