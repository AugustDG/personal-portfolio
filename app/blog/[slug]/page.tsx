import { getBlog } from "@/lib/directus";
import Image from "next/image";
import ClientBlogEnhancements from "./client";
import type { Metadata } from "next";
import { estimateReadingTime } from "@/lib/readingTime";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";
import { PageProps } from "@/lib/types";
import { BackLink } from "@/components/BackLink";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) return { title: "Not found" };

  const desc = post.excerpt || (post.body || "").slice(0, 155);
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/blog/${post.slug}`;

  const fallbackOg = `${base}/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent("Blog Post")}&accent=magenta`;

  return {
    title: `${post.title} – Augusto Pinheiro`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: desc,
      url: canonical,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at || post.published_at,
      authors: ["Augusto Pinheiro"],
      tags: post.tags,
      images: [{ url: post.header_image_url || fallbackOg }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: desc,
      images: [post.header_image_url || fallbackOg],
    },
  };
}

export default async function BlogPostPage({ params }: { params: PageProps }) {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) return <p className="opacity-60">Not found.</p>;

  const rt = estimateReadingTime(post.body || "");
  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";

  return (
    <div id="__detail_root">
      <article className="space-y-6">
        <header className="space-y-2">
          <BackLink href="/blog" label="All Posts" />
          {post.header_image_url && (
            <div className="border-retro-purple/40 relative mb-4 h-[220px] w-full overflow-hidden rounded-sm border sm:h-[260px] md:h-[320px] lg:h-[380px]">
              <Image
                src={post.header_image_url}
                alt={post.title}
                fill
                priority={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            </div>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="font-pixel text-2xl font-semibold tracking-tight">
              <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            <div className="sm:mt-1">
              <ClientBlogEnhancements
                post={post}
                readingTime={rt.text}
                variant="inline"
              />
            </div>
          </div>
          <p className="text-retro-cyan font-mono text-xs opacity-80">
            {(post.published_at || post.updated_at) && (
              <span className="text-retro-yellow/80 mr-2">
                {post.published_at || post.updated_at}
              </span>
            )}
            {rt.text}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {post.tags?.map((t) => (
              <TagPill key={t} tag={t} />
            ))}
          </div>
          <div className="bg-retro-purple/30 my-5 h-px w-full" />
        </header>
        <section>
          <MarkdownRenderer content={post.body || ""} />
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              datePublished: post.published_at,
              dateModified: post.updated_at || post.published_at,
              author: { "@type": "Person", name: "Augusto Pinheiro" },
              mainEntityOfPage: `${base}/blog/${post.slug}`,
              image: post.header_image_url,
              keywords: post.tags?.join(", "),
            }),
          }}
        />
      </article>
    </div>
  );
}
