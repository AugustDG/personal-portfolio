import { getGalleries } from "@/lib/directus";
import { TagPill } from "@/components/TagPill";
import { notFound } from "next/navigation";
import { PageProps } from "@/lib/types";

export async function generateStaticParams() {
  const galleries = await getGalleries();
  return galleries.map((g) => ({ slug: g.slug }));
}

export default async function GalleryPage({ params }: { params: PageProps }) {
  const { slug } = await params;
  const galleries = await getGalleries();
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery) return notFound();
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="space-y-3">
        <h1 className="font-pixel pixel-border glow-yellow from-retro-yellow via-retro-orange to-retro-magenta inline-block bg-linear-to-br px-4 py-3 text-3xl text-black">
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
            className="pixel-border hover:bg-retro-purple/30 overflow-hidden bg-[#12162b] transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.description || ""}
              className="h-48 w-full object-cover"
            />
            {img.description && (
              <figcaption className="text-retro-cyan p-2 font-mono text-xs opacity-80">
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
