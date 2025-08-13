import { TagPill } from "@/components/TagPill";
import { PhotosImagesClient } from "./client";
import type { Metadata } from "next";
import { getPhotoGallery, getPhotoGalleries } from "@/lib/directus";
import { PageProps } from "@/lib/types";
import { BackLink } from "@/components/BackLink";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { slug } = await params;
  const photo = await getPhotoGallery(slug);

  if (!photo) return { title: "Not found" };
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/photos/${photo.slug}`;
  const desc = photo.title;
  const fallbackOg = `${base}/og?title=${encodeURIComponent(photo.title)}&subtitle=${encodeURIComponent("Photos")}`;

  return {
    title: `${photo.title} - Augusto Pinheiro`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: photo.title,
      description: desc,
      url: canonical,
      images: [{ url: photo.images?.[0]?.src_url || fallbackOg }],
    },
    twitter: {
      card: "summary_large_image",
      title: photo.title,
      description: desc,
      images: [photo.images?.[0]?.src_url || fallbackOg],
    },
  };
}

export default async function PhotosPage({ params }: { params: PageProps }) {
  const { slug } = await params;
  const photo = await getPhotoGallery(slug);

  if (!photo) return <p className="opacity-60">Not found.</p>;

  return (
    <div id="__detail_root" className="space-y-6">
      <BackLink href="/photos" label="All photos" />
      <div className="space-y-3">
        <h1 className="font-pixel pixel-border glow-yellow from-retro-yellow via-retro-orange to-retro-magenta inline-block bg-linear-to-br px-4 py-3 text-3xl text-black">
          {photo.title}
        </h1>
        {Array.isArray(photo.tags) && photo.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {photo.tags.map((t: string) => (
              <TagPill key={t} tag={t} />
            ))}
          </div>
        )}
      </div>
      {photo.images?.length ? (
        <PhotosImagesClient images={photo.images} />
      ) : (
        <p className="opacity-60">No images yet.</p>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: photo.title,
            itemListElement: photo.images?.map((img, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: img.src_url,
              name: img.description || `Image ${index + 1}`,
            })),
            keywords: photo.tags?.join(", "),
          }),
        }}
      />
    </div>
  );
}
