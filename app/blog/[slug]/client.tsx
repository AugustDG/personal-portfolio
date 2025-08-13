"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/Tooltip";
import { TagPill } from "@/components/TagPill"; // in case we reuse tags later
import type { BlogPost } from "@/lib/directus";

interface Props {
  post: BlogPost;
  readingTime: string;
  variant?: "block" | "inline";
}

export default function ClientBlogEnhancements({
  post,
  readingTime,
  variant = "block",
}: Props) {
  const [focus, setFocus] = React.useState(false);
  const [shareState, setShareState] = React.useState<
    "idle" | "copied" | "shared" | "error"
  >("idle");

  React.useEffect(() => {
    if (focus) document.documentElement.setAttribute("data-focus-blog", "true");
    else document.documentElement.removeAttribute("data-focus-blog");

    return () => document.documentElement.removeAttribute("data-focus-blog");
  }, [focus]);

  const handleShare = React.useCallback(async () => {
    try {
      const url = window.location.href;

      if (navigator.share) {
        await navigator.share({ title: post.title, url });
        setShareState("shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
      } else {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setShareState("copied");
      }
    } catch {
      setShareState("error");
    } finally {
      setTimeout(() => setShareState("idle"), 1600);
    }
  }, [post.title]);

  const buttons = (
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -2 }}
        onClick={() => setFocus((f) => !f)}
        className="pixel-border glow-cyan/0 hover:glow-cyan/30 text-retro-cyan focus:ring-retro-yellow inline-flex h-7 items-center rounded-sm bg-[#12162b]/70 px-2 font-mono text-[10px] tracking-wide whitespace-nowrap uppercase transition focus:ring-2 focus:outline-none"
        aria-pressed={focus}
        aria-label={focus ? "Exit focus mode" : "Enter focus mode"}
      >
        {focus ? "EXIT FOCUS" : "FOCUS"}
      </motion.button>
      <Tooltip
        label={
          shareState === "copied"
            ? "Link copied"
            : shareState === "shared"
              ? "Shared!"
              : shareState === "error"
                ? "Failed - retry"
                : typeof navigator !== "undefined" &&
                    typeof navigator.share === "function"
                  ? "Native share"
                  : "Copy link"
        }
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -2 }}
          onClick={handleShare}
          className="pixel-border glow-purple/0 hover:glow-purple/40 text-retro-yellow focus:ring-retro-yellow inline-flex h-7 items-center rounded-sm bg-[#12162b]/80 px-3 font-mono text-[10px] font-semibold tracking-wide uppercase transition focus:ring-2 focus:outline-none"
          aria-label="Share this post"
        >
          {shareState === "idle" && "SHARE"}
          {shareState === "copied" && "COPIED"}
          {shareState === "shared" && "SHARED"}
          {shareState === "error" && "RETRY"}
        </motion.button>
      </Tooltip>
    </div>
  );

  if (variant === "inline") return buttons;

  return <div className="space-y-3">{buttons}</div>;
}
