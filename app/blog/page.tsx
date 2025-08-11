import { getBlogs } from "@/lib/directus";
import Link from "next/link";

export default async function BlogIndex() {
  const posts = await getBlogs();
  return (
    <div className="space-y-10 animate-fadeIn">
      <h1 className="font-pixel text-3xl font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-retro-magenta via-retro-yellow to-retro-cyan bg-clip-text text-transparent">
          Blog
        </span>
        <span className="block h-1 mt-4 w-48 bg-gradient-to-r from-retro-magenta via-retro-purple/60 to-transparent" />
      </h1>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li
            key={p.id}
            className="group relative bg-[#12162b] border border-retro-purple/40 hover:border-retro-magenta transition-colors rounded-sm overflow-hidden"
          >
            <Link href={`/blog/${p.slug}`} className="block p-4 space-y-2">
              <h2 className="font-semibold text-retro-magenta tracking-wide group-hover:text-retro-yellow transition-colors">
                {p.title}
              </h2>
              <p className="text-xs md:text-[13px] opacity-80 line-clamp-2 text-retro-cyan/90 leading-relaxed">
                {p.body.slice(0, 140)}
              </p>
            </Link>
          </li>
        ))}
        {!posts.length && <li className="opacity-60">No posts yet.</li>}
      </ul>
    </div>
  );
}
