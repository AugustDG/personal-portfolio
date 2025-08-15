import Link from 'next/link';
import Image from 'next/image';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { getPhotoGalleries } from '@/lib/directus';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, '') || '';
  const canonical = `${base}/photos`;

  return {
    title: 'Photos – Augusto Pinheiro',
    description: 'Photo photos and visual explorations.',
    alternates: {
      canonical,
      types: { 'application/rss+xml': '/photos/rss.xml' },
    },
    openGraph: {
      type: 'website',
      title: 'Photos – Augusto Pinheiro',
      description: 'Photo photos and visual explorations.',
      url: canonical,
    },
    twitter: {
      card: 'summary',
      title: 'Photos – Augusto Pinheiro',
      description: 'Photo photos and visual explorations.',
    },
  };
}

export default async function PhotosPage() {
  const photos = await getPhotoGalleries();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-pixel text-5xl font-semibold tracking-tight">
          <span className="from-retro-yellow via-retro-orange to-retro-magenta bg-linear-to-r bg-clip-text text-transparent">
            Photos
          </span>
          <span className="from-retro-yellow via-retro-magenta/60 mt-4 block h-1 w-56 bg-linear-to-r to-transparent" />
        </h1>
        <div>
          <a
            href="/photos/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="border-retro-magenta/60 text-retro-magenta hover:border-retro-yellow hover:text-retro-yellow focus:ring-retro-yellow/70 inline-flex items-center gap-1 rounded-sm border bg-[#1b2140] px-3 py-1 font-mono text-[11px] tracking-wide uppercase shadow-[0_0_0_2px_#ff00ff,3px_3px_0_0_#00fff6] transition hover:shadow-[0_0_0_2px_#ffe600,3px_3px_0_0_#ff00ff] focus:ring-2 focus:outline-none"
            aria-label="Subscribe to Photos RSS feed"
          >
            <span className="hidden sm:inline">Subscribe</span>
            <span className="sm:hidden">RSS</span>
            <span aria-hidden>📡</span>
          </a>
        </div>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((g, i) => (
          <StaggerItem index={i} key={g.id} as="li">
            <div className="group border-retro-purple/40 hover:border-retro-yellow relative flex h-full flex-col overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
              <Link href={`/photos/${g.slug}`} className="flex h-full flex-col">
                {g.images?.[0]?.thumbnail_url && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={g.images[0].thumbnail_url!}
                      alt={g.images[0].description || g.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      priority={i < 3}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                )}
                <div className="flex min-h-[96px] flex-1 flex-col p-4">
                  <h2 className="text-retro-magenta group-hover:text-retro-yellow mb-1 line-clamp-2 font-semibold tracking-wide transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-retro-cyan/90 text-xs opacity-80">
                    {g.images?.length || 0} images
                  </p>
                  {(g.description ||
                    g.images?.find((img) => img.description)?.description) && (
                    <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-white/70">
                      {g.description ||
                        g.images?.find((img) => img.description)?.description}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          </StaggerItem>
        ))}
        {!photos.length && <li className="opacity-60">No photos yet.</li>}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Photo photos',
            itemListElement: photos.map((g, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `/photos/${g.slug}`,
              name: g.title,
            })),
          }),
        }}
      />
    </div>
  );
}
