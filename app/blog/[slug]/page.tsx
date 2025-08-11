import { getBlogs } from "@/lib/directus";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";

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
        {post.header_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.header_image_url}
            alt={post.title}
            className="w-full aspect-[16/7] object-cover rounded-sm border border-retro-purple/40 mb-4"
            loading="lazy"
          />
        )}
        <h1 className="font-pixel text-3xl pixel-border glow-cyan inline-block bg-retro-cyan text-black px-4 py-3">
          {post.title}
        </h1>
        <p className="text-xs opacity-80 font-mono text-retro-cyan">
          {rt.text}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
        </div>
      </header>
      <section>
        <MarkdownRenderer content={post.body || ""} />
      </section>
    </article>
  );
}
