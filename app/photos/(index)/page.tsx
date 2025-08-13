import Link from "next/link";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { getPhotos } from "@/lib/directus";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/photos`;

  return {
    title: "Photos – Augusto Pinheiro",
    description: "Photo photos and visual explorations.",
    alternates: {
      canonical,
      types: { "application/rss+xml": "/photos/rss.xml" },
    },
    openGraph: {
      type: "website",
      title: "Photos – Augusto Pinheiro",
      description: "Photo photos and visual explorations.",
      url: canonical,
    },
    twitter: {
      card: "summary",
      title: "Photos – Augusto Pinheiro",
      description: "Photo photos and visual explorations.",
    },
  };
}

export default async function PhotosPage() {
  const photos = await getPhotos();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-pixel text-3xl font-semibold tracking-tight">
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
            <div className="group border-retro-purple/40 hover:border-retro-yellow relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
              <Link href={`/photos/${g.slug}`} className="block space-y-1 p-4">
                <h2 className="text-retro-magenta group-hover:text-retro-yellow mb-1 font-semibold tracking-wide transition-colors">
                  {g.title}
                </h2>
                <p className="text-retro-cyan/90 text-xs opacity-80">
                  {g.images?.length || 0} images
                </p>
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
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Photo photos",
            itemListElement: photos.map((g, index) => ({
              "@type": "ListItem",
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
