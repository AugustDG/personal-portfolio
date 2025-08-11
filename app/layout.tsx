import "./globals.css";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { RetroNav } from "@/components/layout/RetroNav";
import { ColorBar } from "@/components/layout/ColorBar";
import { SearchProvider } from "@/components/search/SearchContext";
import { SearchIndexer } from "@/components/search/Indexer";
import { LightboxProvider } from "@/components/lightbox/LightboxContext";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";

const heading = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Augusto Pinheiro – Portfolio",
  description: "Neon cyberpunk portfolio of Augusto Pinheiro",
};

const SidebarSocials = dynamic(
  () => import("@/components/layout/SidebarSocials"),
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${heading.variable} ${body.variable} ${mono.variable} bg-retro-beige text-retro-brown h-full`}
    >
      <body className="font-body selection:bg-retro-magenta flex h-screen min-h-0 w-full flex-col overflow-hidden antialiased selection:text-black">
        <LightboxProvider>
          <Lightbox />
          <SearchProvider>
            <SearchIndexer />
            <ColorBar />
            <RetroNav />
            <main className="relative z-10 min-h-0 w-full flex-1 overflow-y-auto">
              <div className="mx-auto grid min-h-full max-w-[1200px] grid-cols-1 gap-10 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-[minmax(0,900px)_1fr]">
                <div className="space-y-12">{children}</div>
                <SidebarSocials />
              </div>
            </main>
          </SearchProvider>
        </LightboxProvider>
      </body>
    </html>
  );
}
