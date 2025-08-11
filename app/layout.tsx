import "./globals.css";
import type { ReactNode } from "react";
import { RetroNav } from "@/components/layout/RetroNav";
import { ColorBar } from "@/components/layout/ColorBar";
import { SearchProvider } from "@/components/search/SearchContext";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${mono.variable} bg-retro-beige text-retro-brown`}
    >
      <body className="min-h-screen font-body antialiased selection:bg-retro-magenta selection:text-black">
        <SearchProvider>
          <ColorBar />
          <RetroNav />
          <main className="relative z-10 w-full crt-scanlines">
            <div className="px-4 md:px-8 mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[minmax(0,900px)_1fr] gap-10 py-6 md:py-10">
              <div className="space-y-12">{children}</div>
              <aside className="hidden lg:flex flex-col gap-6 pt-2 text-xs tracking-wide">
                <div>
                  <p className="font-pixel text-[10px] mb-2 text-retro-yellow">
                    NAV
                  </p>
                  <ul className="space-y-1 font-mono">
                    <li>
                      <a href="/projects" className="hover:text-retro-magenta">
                        Projects
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="hover:text-retro-magenta">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/galleries" className="hover:text-retro-magenta">
                        Galleries
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-pixel text-[10px] mb-2 text-retro-yellow">
                    SOCIAL
                  </p>
                  <ul className="space-y-1 font-mono">
                    <li>
                      <a href="#" className="hover:text-retro-cyan">
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-retro-cyan">
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-retro-cyan">
                        Twitter
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto opacity-60 font-mono">
                  © {new Date().getFullYear()}
                </div>
              </aside>
            </div>
          </main>
        </SearchProvider>
      </body>
    </html>
  );
}
