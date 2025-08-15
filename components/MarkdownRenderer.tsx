'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeRaw from 'rehype-raw';
import clsx from 'clsx';
import { useLightbox } from '@/components/lightbox/LightboxContext';

interface Props {
  className?: string;
  content: string;
}

export function MarkdownRenderer({ content, className }: Props) {
  const { openLightbox } = useLightbox();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Post-render transform: lists -> gallery if every li has a single image span
  useEffect(() => {
    const root = containerRef.current;

    if (!root) return;
    const lists = Array.from(root.querySelectorAll('ul, ol')) as (
      | HTMLUListElement
      | HTMLOListElement
    )[];
    lists.forEach((list) => {
      if (list.dataset.mdGalleryProcessed) return;
      const items = Array.from(list.children).filter(
        (el) => el.tagName === 'LI',
      ) as HTMLLIElement[];

      if (items.length < 2) return;
      const spans: HTMLSpanElement[] = [];

      for (const li of items) {
        // find image span
        const spanImgs = li.querySelectorAll('span[data-md-inline-image]');

        if (spanImgs.length !== 1) return; // abort
        // check for other meaningful text besides that span
        const clone = li.cloneNode(true) as HTMLElement;
        // remove span to inspect leftover text
        clone.querySelectorAll('span[data-md-inline-image]').forEach((s) => s.remove());
        const leftover = clone.textContent?.trim();

        if (leftover) return; // has other text
        spans.push(spanImgs[0] as HTMLSpanElement);
      }

      if (spans.length !== items.length) return;
      // Build gallery wrapper
      const wrapper = document.createElement('div');
      wrapper.className = '-mx-4 overflow-x-auto py-2 pl-4';
      wrapper.setAttribute('data-md-gallery', 'true');
      const track = document.createElement('div');
      track.className = 'flex gap-4';
      wrapper.appendChild(track);
      // Insert wrapper before list
      list.parentElement?.insertBefore(wrapper, list);
      spans.forEach((origSpan) => {
        const img = origSpan.querySelector('img');

        if (!img) return;
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || 'Image';
        const btn = document.createElement('button');
        btn.type = 'button';
        // Remove aspect-video + conflicting fixed height; rely on fixed height only
        btn.className =
          'relative h-64 w-80 shrink-0 overflow-hidden rounded-sm border border-retro-purple/40 bg-[#0d1122] hover:border-retro-magenta focus:outline-none focus:ring-2 focus:ring-retro-magenta/70';
        const innerImg = document.createElement('img');
        innerImg.src = src;
        innerImg.alt = alt;
        innerImg.style.width = '100%';
        innerImg.style.height = '100%';
        innerImg.style.objectFit = 'cover';
        innerImg.style.display = 'block';
        btn.appendChild(innerImg);
        btn.addEventListener('click', () => openLightbox(src, alt));
        track.appendChild(btn);
      });
      list.dataset.mdGalleryProcessed = 'true';
      list.style.display = 'none'; // keep for React reconciliation but hide visually
    });
  }, [content, openLightbox]);

  return (
    <div
      ref={containerRef}
      className={clsx('prose prose-invert prose-readable w-full', className)}
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
            const isInline = !/language-/.test(className || '');

            return isInline ? (
              <code className="text-retro-yellow/90 rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em]">
                {children}
              </code>
            ) : (
              <code className={clsx(className, 'font-mono')}>{children}</code>
            );
          },
          a: (props) => (
            <a
              {...props}
              className="decoration-retro-magenta/60 hover:decoration-retro-cyan text-retro-cyan hover:text-retro-magenta underline transition-colors"
            />
          ),
          h1: (props) => (
            <h1 {...props} className="font-pixel text-retro-magenta tracking-tight" />
          ),
          h2: (props) => (
            <h2 {...props} className="font-pixel text-retro-cyan tracking-tight" />
          ),
          h3: (props) => (
            <h3 {...props} className="font-pixel text-retro-purple tracking-tight" />
          ),
          // Let native ul/ol render; we'll transform afterward
          img: (props) => {
            const src = (props.src as string) || '';

            return (
              <span
                data-md-inline-image
                className="pixel-border mx-auto my-6 block max-w-3xl cursor-zoom-in overflow-hidden"
                onClick={() => openLightbox(src, props.alt)}
              >
                <Image
                  src={src}
                  alt={props.alt || 'Image'}
                  width={1200}
                  height={800}
                  className="h-auto w-full object-contain"
                  sizes="100vw"
                />
              </span>
            );
          },
          iframe: (props) => {
            // Normalize iframe presentation: same width constraints & vertical spacing as images.
            // Wrap in aspect-ratio box if width/height not specified or to enforce responsive 16:9.
            const {
              width: _w,
              height: _h,
              className: _c,
              style: _s,
              ...rest
            } = props as React.IframeHTMLAttributes<HTMLIFrameElement>;

            return (
              <div className="mx-auto my-6 w-full max-w-3xl">
                <div className="pixel-border relative aspect-video w-full overflow-hidden rounded-sm bg-[#0d1122]">
                  {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                  <iframe
                    {...rest}
                    className="absolute inset-0 h-full w-full"
                    loading={props.loading || 'lazy'}
                    allowFullScreen={props.allowFullScreen ?? true}
                  />
                </div>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
