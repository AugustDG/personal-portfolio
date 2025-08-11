"use client";
import { useLightbox } from "@/components/lightbox/LightboxContext";

interface Img {
  id: string;
  src_url?: string;
  description?: string;
}
export function GalleryImagesClient({ images }: { images: Img[] }) {
  const { openLightbox } = useLightbox();

  if (!images?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img) => (
        <figure
          key={img.id}
          className="pixel-border hover:bg-retro-purple/30 overflow-hidden bg-[#12162b] transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src_url}
            alt={img.description || ""}
            className="h-48 w-full cursor-zoom-in object-cover"
            onClick={() => openLightbox(img.src_url || "", img.description)}
          />
          {img.description && (
            <figcaption className="text-retro-cyan p-2 font-mono text-xs opacity-80">
              {img.description}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
