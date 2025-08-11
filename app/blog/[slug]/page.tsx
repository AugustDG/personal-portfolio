"use client";
import readingTime from "reading-time";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";
import { useApi } from "@/lib/hooks/useApi";
import type { BlogPost } from "@/lib/directus";
import { PageProps } from "@/lib/types";
import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/Tooltip";

export default function BlogPostPage({ params }: { params: PageProps }) {
  const { slug } = React.use(params);
  const {
    data: post,
    isLoading,
    error,
  } = useApi<BlogPost>(`/api/blog/${slug}`);
  const rt = readingTime(post?.body || "");
  const [focus, setFocus] = React.useState(false);
  const [shareState, setShareState] = React.useState<"idle" | "copied" | "shared" | "error">("idle");

  const handleShare = React.useCallback(async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: post?.title || document.title, url });
        setShareState("shared");
        setTimeout(() => setShareState("idle"), 1600);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 1600);
      } else {
        // final fallback: create temp input
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 1600);
      }
    } catch (e) {
      setShareState("error");
      setTimeout(() => setShareState("idle"), 1600);
    }
  }, [post?.title]);
  React.useEffect(() => {
    if (focus) {
      document.documentElement.setAttribute("data-focus-blog", "true");
    } else {
      document.documentElement.removeAttribute("data-focus-blog");
    }
    return () => {
      document.documentElement.removeAttribute("data-focus-blog");
    };
  }, [focus]);
  return (
    <article
      className={
        focus ? "focus-enter mx-auto max-w-3xl space-y-6" : "space-y-6"
      }
    >
      <header className={focus ? "space-y-2" : "space-y-2"}>
        {isLoading && (
          <p className="text-retro-cyan text-sm opacity-70">Loading…</p>
        )}
        {error && <p className="text-retro-magenta text-sm">Failed to load.</p>}
        {!isLoading && !error && !post && (
          <p className="opacity-60">Not found.</p>
        )}
        {!focus && post?.header_image_url && (
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
            <div className="flex w-full items-start gap-3">
              <h1 className="font-pixel text-2xl font-semibold tracking-tight">
                <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -2 }}
                onClick={() => setFocus((f) => !f)}
                className="pixel-border glow-cyan/0 hover:glow-cyan/30 text-retro-cyan focus:ring-retro-yellow mt-1 ml-auto inline-flex h-7 items-center rounded-sm bg-[#12162b]/70 px-2 font-mono text-[10px] tracking-wide whitespace-nowrap uppercase transition focus:ring-2 focus:outline-none"
                aria-pressed={focus}
                aria-label={focus ? "Exit focus mode" : "Enter focus mode"}
              >
                {focus ? "EXIT FOCUS" : "FOCUS"}
              </motion.button>
            </div>
            {!focus && (
              <>
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
                <div className="mt-3">
                  <Tooltip
                    label={
                      shareState === "copied"
                        ? "Link copied"
                        : shareState === "shared"
                        ? "Shared!"
                        : shareState === "error"
                        ? "Failed – click to retry"
                        : (typeof navigator !== "undefined" && typeof navigator.share === "function")
                        ? "Native share"
                        : "Copy link"
                    }
                  >
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ y: -2 }}
                      onClick={handleShare}
                      className="pixel-border glow-purple/0 hover:glow-purple/40 text-retro-yellow font-semibold focus:ring-retro-yellow inline-flex h-7 items-center rounded-sm bg-[#12162b]/80 px-3 font-mono text-[10px] uppercase tracking-wide transition focus:ring-2 focus:outline-none"
                      aria-label="Share this post"
                    >
                      {shareState === "idle" && "SHARE"}
                      {shareState === "copied" && "COPIED"}
                      {shareState === "shared" && "SHARED"}
                      {shareState === "error" && "RETRY"}
                    </motion.button>
                  </Tooltip>
                </div>
                <div className="my-5 h-px w-full bg-retro-purple/30" />
              </>
            )}
          </>
        )}
      </header>
      {post && (
        <section className={focus ? "mt-6" : undefined}>
          <MarkdownRenderer content={post.body || ""} />
        </section>
      )}
    </article>
  );
}
