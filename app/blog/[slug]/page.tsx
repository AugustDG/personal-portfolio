"use client";
import readingTime from "reading-time";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";
import { useApi } from "@/lib/hooks/useApi";
import type { BlogPost } from "@/lib/directus";
import { PageProps } from "@/lib/types";
import React from "react";

export default function BlogPostPage({ params }: { params: PageProps }) {
  const { slug } = React.use(params);
  const {
    data: post,
    isLoading,
    error,
  } = useApi<BlogPost>(`/api/blog/${slug}`);
  const rt = readingTime(post?.body || "");
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        {isLoading && (
          <p className="text-retro-cyan text-sm opacity-70">Loading…</p>
        )}
        {error && <p className="text-retro-magenta text-sm">Failed to load.</p>}
        {!isLoading && !error && !post && (
          <p className="opacity-60">Not found.</p>
        )}
        {post?.header_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.header_image_url}
            alt={post.title}
            className="border-retro-purple/40 mb-4 aspect-16/7 w-full rounded-sm border object-cover"
            loading="lazy"
          />
        )}
        {post && (
          <>
            <h1 className="font-pixel text-2xl font-semibold tracking-tight">
              <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>
            <p className="text-retro-cyan font-mono text-xs opacity-80">
              {(post.published_at || post.updated_at) && (
                <span className="text-retro-yellow/80 mr-2">
                  {post.published_at || post.updated_at}
                </span>
              )}
              {rt.text}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((t) => (
                <TagPill key={t} tag={t} />
              ))}
            </div>
          </>
        )}
      </header>
      {post && (
        <section>
          <MarkdownRenderer content={post.body || ""} />
        </section>
      )}
    </article>
  );
}
