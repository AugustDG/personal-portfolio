import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";

export function RetroNav() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-retro-beige/90 border-b border-black/20">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 p-3 text-sm font-pixel">
        <Link
          href="/"
          className="pixel-border bg-retro-orange px-3 py-2 text-black hover:bg-retro-magenta hover:text-white transition-colors"
        >
          HOME
        </Link>
        <Link
          href="/projects"
          className="pixel-border bg-retro-teal px-3 py-2 text-black hover:bg-retro-magenta hover:text-white transition-colors"
        >
          PROJECTS
        </Link>
        <Link
          href="/blog"
          className="pixel-border bg-retro-purple px-3 py-2 text-white hover:bg-retro-magenta transition-colors"
        >
          BLOG
        </Link>
        <Link
          href="/galleries"
          className="pixel-border bg-retro-yellow px-3 py-2 text-black hover:bg-retro-magenta hover:text-white transition-colors"
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
