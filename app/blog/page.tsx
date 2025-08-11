import { getBlogs } from "@/lib/directus";
import Link from "next/link";

export default async function BlogIndex() {
  const posts = await getBlogs();
  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="font-pixel text-2xl">Blog</h1>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li
            key={p.id}
            className="pixel-border bg-white hover:bg-retro-teal/30 transition-colors"
          >
            <Link href={`/blog/${p.slug}`} className="block p-4">
              <h2 className="font-bold">{p.title}</h2>
              <p className="text-xs opacity-70 line-clamp-2">
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
