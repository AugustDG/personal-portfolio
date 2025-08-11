import { getBlogs } from "@/lib/directus";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";
import { PageProps } from "@/lib/types";

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: PageProps }) {
  const { slug } = await params;
  const posts = await getBlogs();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  const rt = readingTime(post.body || "");
  return (
    <article className="animate-fadeIn space-y-6">
      <header className="space-y-2">
        {post.header_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.header_image_url}
            alt={post.title}
            className="border-retro-purple/40 mb-4 aspect-16/7 w-full rounded-sm border object-cover"
            loading="lazy"
          />
        )}
        <h1 className="font-pixel pixel-border glow-cyan bg-retro-cyan inline-block px-4 py-3 text-3xl text-black">
          {post.title}
        </h1>
        <p className="text-retro-cyan font-mono text-xs opacity-80">
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
