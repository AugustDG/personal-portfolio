"use client";

import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Tooltip } from "@/components/ui/Tooltip";

export function RetroNav({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header className="bg-retro-beige/80 border-retro-purple/40 sticky top-0 z-20 border-b backdrop-blur">
      <nav className="font-pixel mx-auto flex max-w-[1400px] items-center gap-3 p-3 text-[10px] sm:text-xs md:text-sm">
        <Tooltip label="Go to homepage">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            <Link
              href="/"
              className="pixel-border glow-magenta from-retro-purple via-retro-magenta to-retro-orange hover:from-retro-magenta hover:to-retro-purple inline-block bg-linear-to-br px-3 py-2 text-white transition-colors"
            >
              HOME
            </Link>
          </motion.div>
        </Tooltip>
        <Tooltip label="View projects">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            <Link
              href="/projects"
              className="pixel-border glow-cyan bg-retro-teal hover:bg-retro-cyan inline-block px-3 py-2 text-black transition-colors"
            >
              PROJECTS
            </Link>
          </motion.div>
        </Tooltip>
        <Tooltip label="Read blog posts">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            <Link
              href="/blog"
              className="pixel-border glow-purple bg-retro-purple hover:bg-retro-magenta inline-block px-3 py-2 text-white transition-colors"
            >
              BLOG
            </Link>
          </motion.div>
        </Tooltip>
        <Tooltip label="Browse photos">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.94 }}>
            <Link
              href="/photos"
              className="pixel-border glow-yellow bg-retro-yellow hover:bg-retro-orange inline-block px-3 py-2 text-black transition-colors"
            >
              PHOTOS
            </Link>
          </motion.div>
        </Tooltip>
        <div className="ml-auto flex items-center gap-6">
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
