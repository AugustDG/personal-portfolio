import { getGalleries } from "@/lib/directus";
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
      <h1 className="font-pixel text-3xl pixel-border inline-block bg-retro-orange text-black px-4 py-3">
        {gallery.title}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.images?.map((img) => (
          <figure
            key={img.id}
            className="pixel-border bg-white overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.description || ""}
              className="w-full h-48 object-cover"
            />
            {img.description && (
              <figcaption className="p-2 text-xs font-mono opacity-70">
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
