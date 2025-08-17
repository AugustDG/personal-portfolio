import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { RetroNav } from "@/components/layout/RetroNav";
import { ColorBar } from "@/components/layout/ColorBar";
import { SearchProvider } from "@/components/search/SearchContext";
import { SearchIndexer } from "@/components/search/Indexer";
import { LightboxProvider } from "@/components/lightbox/LightboxContext";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityContext";
import { AccessibilityToggle } from "@/components/accessibility/AccessibilityToggle";
import { Tooltip } from "@/components/ui/Tooltip";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { Chakra_Petch, Inter, JetBrains_Mono } from "next/font/google";

const heading = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Augusto Pinheiro – Portfolio",
  description: "Neon cyberpunk portfolio of Augusto Pinheiro",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

// (Sidebar is now loaded via ContentGrid when appropriate)

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${heading.variable} ${body.variable} ${mono.variable} bg-retro-beige text-retro-brown h-full`}
    >
      <body
        className="font-body selection:bg-retro-magenta flex h-screen min-h-0 w-full flex-col overflow-hidden antialiased selection:text-black"
        id="__app_root"
      >
        <LightboxProvider>
          <Lightbox />
          <AccessibilityProvider>
            <SearchProvider>
              <SearchIndexer />
              <ColorBar />
              <RetroNav
                rightSlot={
                  <Tooltip label={"Toggle simplified colors"}>
                    <AccessibilityToggle />
                  </Tooltip>
                }
              />
              <main
                className="relative z-10 min-h-0 w-full flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10"
                id="__main"
              >
                {children}
              </main>
            </SearchProvider>
          </AccessibilityProvider>
        </LightboxProvider>
      </body>
    </html>
  );
}
