"use client";

import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Tooltip } from "@/components/ui/Tooltip";

export function RetroNav({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header className="bg-retro-beige/80 border-retro-purple/40 sticky top-0 z-20 border-b backdrop-blur">
      <nav className="font-pixel relative mx-auto flex max-w-[1400px] items-center gap-3 p-3 text-[10px] sm:text-xs md:text-sm">
        {/* Scrollable link track */}
        <div className="relative flex min-w-0 flex-1 overflow-visible">
          <div
            className="no-scrollbar relative flex min-w-0 flex-1 items-stretch gap-4 overflow-x-auto px-4 pt-1 pr-8 pb-1 lg:gap-5"
            aria-label="Primary navigation"
          >
            <div className="from-retro-beige/95 pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r to-transparent md:hidden" />
            <div className="from-retro-beige/95 pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent md:hidden" />
            <Tooltip label="Go to homepage">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/"
                  className="pixel-border glow-magenta from-retro-purple via-retro-magenta to-retro-orange hover:from-retro-magenta hover:to-retro-purple inline-block bg-linear-to-br px-3 py-2 text-white transition-colors"
                >
                  HOME
                </Link>
              </motion.div>
            </Tooltip>
            <Tooltip label="View projects">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/projects"
                  className="pixel-border glow-cyan bg-retro-teal hover:bg-retro-cyan inline-block px-3 py-2 text-black transition-colors"
                >
                  PROJECTS
                </Link>
              </motion.div>
            </Tooltip>
            <Tooltip label="Read blog posts">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/blog"
                  className="pixel-border glow-purple bg-retro-purple hover:bg-retro-magenta inline-block px-3 py-2 text-white transition-colors"
                >
                  BLOG
                </Link>
              </motion.div>
            </Tooltip>
            <Tooltip label="Browse photos">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex-shrink-0"
              >
                <Link
                  href="/photos"
                  className="pixel-border glow-yellow bg-retro-yellow hover:bg-retro-orange inline-block px-3 py-2 text-black transition-colors"
                >
                  PHOTOS
                </Link>
              </motion.div>
            </Tooltip>
          </div>
        </div>
        {/* Fixed right controls (always visible) */}
        <div className="relative z-30 flex flex-none items-center gap-4 pl-1">
          <Tooltip label="Open search">
            <div>
              <SearchTrigger />
            </div>
          </Tooltip>
          {rightSlot}
        </div>
      </nav>
    </header>
  );
}
