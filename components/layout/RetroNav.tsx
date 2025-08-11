import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";

export function RetroNav() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-[#0d0f17]/80 border-b border-retro-purple/40">
      <nav className="mx-auto flex max-w-6xl items-center gap-3 p-3 text-[10px] sm:text-xs md:text-sm font-pixel">
        <Link
          href="/"
          className="pixel-border glow-magenta bg-gradient-to-br from-retro-purple via-retro-magenta to-retro-orange px-3 py-2 text-white hover:from-retro-magenta hover:to-retro-purple transition-colors"
        >
          HOME
        </Link>
        <Link
          href="/projects"
          className="pixel-border glow-cyan bg-retro-teal px-3 py-2 text-black hover:bg-retro-cyan transition-colors"
        >
          PROJECTS
        </Link>
        <Link
          href="/blog"
          className="pixel-border glow-purple bg-retro-purple px-3 py-2 text-white hover:bg-retro-magenta transition-colors"
        >
          BLOG
        </Link>
        <Link
          href="/galleries"
          className="pixel-border glow-yellow bg-retro-yellow px-3 py-2 text-black hover:bg-retro-orange transition-colors"
        >
          GALLERIES
        </Link>
        <div className="ml-auto">
          <SearchTrigger />
        </div>
      </nav>
    </header>
  );
}
