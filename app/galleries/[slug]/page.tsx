import { TagPill } from "@/components/TagPill";
import { GalleryImagesClient } from "./client";
import type { Metadata } from "next";
import { getGallery } from "@/lib/directus";
import { PageProps } from "@/lib/types";
export const runtime = "edge";
import { BackLink } from "@/components/BackLink";

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getGallery(slug);
  if (!gallery) return { title: "Not found" };
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/galleries/${gallery.slug}`;
  const desc = gallery.title;
  const fallbackOg = `${base}/og?title=${encodeURIComponent(gallery.title)}&subtitle=${encodeURIComponent("Gallery")}`;
  return {
    title: `${gallery.title} - Augusto Pinheiro`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: gallery.title,
      description: desc,
      url: canonical,
      images: [{ url: gallery.images?.[0]?.src_url || fallbackOg }],
    },
    twitter: {
      card: "summary_large_image",
      title: gallery.title,
      description: desc,
      images: [gallery.images?.[0]?.src_url || fallbackOg],
    },
  };
}

export default async function GalleryPage({ params }: { params: PageProps }) {
  const { slug } = await params;
  const gallery = await getGallery(slug);

  if (!gallery) return <p className="opacity-60">Not found.</p>;

  return (
    <div className="space-y-6">
      <BackLink href="/galleries" label="All Galleries" />
      <div className="space-y-3">
        <h1 className="font-pixel pixel-border glow-yellow from-retro-yellow via-retro-orange to-retro-magenta inline-block bg-linear-to-br px-4 py-3 text-3xl text-black">
          {gallery.title}
        </h1>
        {Array.isArray(gallery.tags) && gallery.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {gallery.tags.map((t: string) => (
              <TagPill key={t} tag={t} />
            ))}
          </div>
        )}
      </div>
      {gallery.images?.length ? (
        <GalleryImagesClient images={gallery.images} />
      ) : (
        <p className="opacity-60">No images yet.</p>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: gallery.title,
            itemListElement: gallery.images?.map((img, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: img.src_url,
              name: img.description || `Image ${index + 1}`,
            })),
            keywords: gallery.tags?.join(", "),
          }),
        }}
      />
    </div>
  );
}
