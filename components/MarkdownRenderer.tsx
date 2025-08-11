import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";
import clsx from "clsx";
import { useLightbox } from "@/components/lightbox/LightboxContext";

interface Props {
  className?: string;
  content: string;
}

export function MarkdownRenderer({ content, className }: Props) {
  const { openLightbox } = useLightbox();
  return (
    <div
      className={clsx("prose prose-invert prose-readable w-full", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism, rehypeRaw]}
        components={{
          pre: ({ children }) => (
            <pre className="pixel-border bg-retro-beige/80 overflow-auto font-mono text-sm leading-relaxed backdrop-blur-sm">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isInline = !/language-/.test(className || "");
            return isInline ? (
              <code className="text-retro-yellow/90 rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em]">
                {children}
              </code>
            ) : (
              <code className={clsx(className, "font-mono")}>{children}</code>
            );
          },
          a: (props) => (
            <a
              {...props}
              className="decoration-retro-magenta/60 hover:decoration-retro-cyan text-retro-cyan hover:text-retro-magenta underline transition-colors"
            />
          ),
          h1: (props) => (
            <h1
              {...props}
              className="font-pixel text-retro-magenta tracking-tight"
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="font-pixel text-retro-cyan tracking-tight"
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className="font-pixel text-retro-purple tracking-tight"
            />
          ),
          img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...props}
              className="pixel-border mx-auto my-6 h-auto max-w-full cursor-zoom-in"
              onClick={() =>
                openLightbox((props.src as string) ?? "", props.alt)
              }
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
