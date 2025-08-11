"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LightboxState {
  open: boolean;
  src: string | null;
  alt?: string;
  openLightbox: (src: string, alt?: string) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxState | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | undefined>(undefined);

  const openLightbox = (src: string, alt?: string) => {
    setSrc(src);
    setAlt(alt);
    setOpen(true);
  };
  const closeLightbox = () => {
    setOpen(false);
    setSrc(null);
    setAlt(undefined);
  };

  return (
    <LightboxContext.Provider
      value={{ open, src, alt, openLightbox, closeLightbox }}
    >
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}
