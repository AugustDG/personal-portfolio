'use client';
import { useLightbox } from '@/components/lightbox/LightboxContext';
import Image from 'next/image';

interface Img {
  id: string;
  src_url?: string;
  thumbnail_url?: string;
  description?: string;
}

export function PhotosImagesClient({ images }: { images: Img[] }) {
  const { openLightbox } = useLightbox();

  if (!images?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img) => (
        <figure
          key={img.id}
          className="pixel-border hover:bg-retro-purple/30 overflow-hidden bg-[#12162b] transition-colors"
        >
          <div
            className="relative h-48 w-full cursor-zoom-in"
            onClick={() => openLightbox(img.src_url || '', img.description)}
          >
            <Image
              src={img.thumbnail_url || img.src_url || ''}
              alt={img.description || ''}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
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
