import { getBlogs } from "@/lib/directus";
import { notFound } from "next/navigation";
import readingTime from "reading-time";

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getBlogs();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();
  const rt = readingTime(post.body || "");
  return (
    <article className="space-y-6 animate-fadeIn">
      <header className="space-y-2">
        <h1 className="font-pixel text-3xl pixel-border inline-block bg-retro-cyan text-black px-4 py-3">
          {post.title}
        </h1>
        <p className="text-xs opacity-70 font-mono">{rt.text}</p>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {post.tags?.map((t) => (
            <span key={t} className="pixel-border bg-white px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      </header>
      <section className="prose max-w-none">
        <pre>{post.body.slice(0, 800)}</pre>
      </section>
    </article>
  );
}
