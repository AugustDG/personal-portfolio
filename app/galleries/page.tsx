import { getGalleries } from "@/lib/directus";
import Link from "next/link";

export default async function GalleriesPage() {
  const galleries = await getGalleries();
  return (
    <div className="space-y-10 animate-fadeIn">
      <h1 className="font-pixel text-3xl font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-retro-yellow via-retro-orange to-retro-magenta bg-clip-text text-transparent">
          Galleries
        </span>
        <span className="block h-1 mt-4 w-56 bg-gradient-to-r from-retro-yellow via-retro-magenta/60 to-transparent" />
      </h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((g) => (
          <li
            key={g.id}
            className="group relative bg-[#12162b] border border-retro-purple/40 hover:border-retro-yellow transition-colors rounded-sm overflow-hidden"
          >
            <Link href={`/galleries/${g.slug}`} className="block p-4 space-y-1">
              <h2 className="font-semibold mb-1 text-retro-magenta tracking-wide group-hover:text-retro-yellow transition-colors">
                {g.title}
              </h2>
              <p className="text-xs opacity-80 text-retro-cyan/90">
                {g.images?.length || 0} images
              </p>
            </Link>
          </li>
        ))}
        {!galleries.length && <li className="opacity-60">No galleries yet.</li>}
      </ul>
    </div>
  );
}
