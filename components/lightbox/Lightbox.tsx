"use client";
import { useLightbox } from "./LightboxContext";
import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export function Lightbox() {
  const { open, src, alt, closeLightbox } = useLightbox();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeLightbox]);

  if (!open || !src) return null;
  return (
    <div
      ref={overlayRef}
      className="animate-fadeIn fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all"
      onClick={(e) => {
        if (e.target === overlayRef.current) closeLightbox();
      }}
    >
      <TransformWrapper
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: false }}
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: true }}
        initialScale={1}
        minScale={0.5}
        maxScale={4}
      >
        {(utils: { resetTransform: () => void }) => (
          <TransformComponent wrapperClass="!overflow-visible">
            <img
              src={src}
              alt={alt || "Image"}
              className="border-retro-purple/60 max-h-[90vh] max-w-[90vw] cursor-move rounded border shadow-lg select-none"
              draggable={false}
              onDoubleClick={utils.resetTransform}
            />
          </TransformComponent>
        )}
      </TransformWrapper>
      <button
        className="text-retro-cyan hover:bg-retro-magenta/80 absolute top-6 right-8 rounded-full bg-black/40 px-3 py-1 text-3xl font-bold transition-colors"
        onClick={closeLightbox}
        aria-label="Close lightbox"
      >
        ×
      </button>
    </div>
  );
}
