import Link from "next/link";
import { getPhotos } from "@/lib/directus";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/photos`;
  return {
    title: "Photos – Augusto Pinheiro",
    description: "Photo photos and visual explorations.",
    alternates: { canonical },
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
      <h1 className="font-pixel text-3xl font-semibold tracking-tight">
        <span className="from-retro-yellow via-retro-orange to-retro-magenta bg-linear-to-r bg-clip-text text-transparent">
          Photos
        </span>
        <span className="from-retro-yellow via-retro-magenta/60 mt-4 block h-1 w-56 bg-linear-to-r to-transparent" />
      </h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((g) => (
          <li
            key={g.id}
            className="group border-retro-purple/40 hover:border-retro-yellow relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors"
          >
            <Link href={`/photos/${g.slug}`} className="block space-y-1 p-4">
              <h2 className="text-retro-magenta group-hover:text-retro-yellow mb-1 font-semibold tracking-wide transition-colors">
                {g.title}
              </h2>
              <p className="text-retro-cyan/90 text-xs opacity-80">
                {g.images?.length || 0} images
              </p>
            </Link>
          </li>
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
