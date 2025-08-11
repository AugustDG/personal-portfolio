import { getGalleries } from "@/lib/directus";
import { TagPill } from "@/components/TagPill";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const galleries = await getGalleries();
  return galleries.map((g) => ({ slug: g.slug }));
}

export default async function GalleryPage({
  params,
}: {
  params: { slug: string };
}) {
  const galleries = await getGalleries();
  const gallery = galleries.find((g) => g.slug === params.slug);
  if (!gallery) return notFound();
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-3">
        <h1 className="font-pixel text-3xl pixel-border glow-yellow inline-block bg-gradient-to-br from-retro-yellow via-retro-orange to-retro-magenta text-black px-4 py-3">
          {gallery.title}
        </h1>
        {Array.isArray((gallery as any).tags) &&
          (gallery as any).tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(gallery as any).tags.map((t: string) => (
                <TagPill key={t} tag={t} />
              ))}
            </div>
          )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.images?.map((img) => (
          <figure
            key={img.id}
            className="pixel-border bg-[#12162b] overflow-hidden hover:bg-retro-purple/30 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.description || ""}
              className="w-full h-48 object-cover"
            />
            {img.description && (
              <figcaption className="p-2 text-xs font-mono opacity-80 text-retro-cyan">
                {img.description}
              </figcaption>
            )}
          </figure>
        ))}
        {!gallery.images?.length && (
          <p className="opacity-60">No images yet.</p>
        )}
      </div>
    </div>
  );
}
