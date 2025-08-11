import { getGalleries } from "@/lib/directus";
import Link from "next/link";

export default async function GalleriesPage() {
  const galleries = await getGalleries();
  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="font-pixel text-2xl">Galleries</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.map((g) => (
          <li
            key={g.id}
            className="pixel-border bg-white hover:bg-retro-purple/20 transition-colors"
          >
            <Link href={`/galleries/${g.slug}`} className="block p-4">
              <h2 className="font-bold mb-1">{g.title}</h2>
              <p className="text-xs opacity-70">
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
