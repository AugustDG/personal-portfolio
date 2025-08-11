import "./globals.css";
import type { ReactNode } from "react";
import { PixelGridBackground } from "@/components/layout/PixelGridBackground";
import { RetroNav } from "@/components/layout/RetroNav";
import { SearchProvider } from "@/components/search/SearchContext";

export const metadata = {
  title: "Augusto Pinheiro – Portfolio",
  description: "Retro colorful portfolio of Augusto Pinheiro",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-retro-beige text-brown">
      <body className="min-h-screen font-display antialiased selection:bg-retro-magenta selection:text-white">
        <PixelGridBackground />
        <SearchProvider>
          <RetroNav />
          <main className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto w-full">
            {children}
          </main>
        </SearchProvider>
      </body>
    </html>
  );
}
