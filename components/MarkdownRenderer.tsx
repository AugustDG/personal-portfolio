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

// Custom components for ReactMarkdown
const PreComponent = (props: any) => (
  <pre className="pixel-border bg-retro-beige/80 overflow-auto font-mono text-sm leading-relaxed backdrop-blur-sm">
    {props.children}
  </pre>
);

const CodeComponent = (props: any) => {
  const isInline = !/language-/.test(props.className || '');

  return isInline ? (
    <code className="text-retro-yellow/90 rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em]">
      {props.children}
    </code>
  ) : (
    <code className={clsx(props.className, 'font-mono')}>{props.children}</code>
  );
};

const LinkComponent = (props: any) => {
  const external = props.href?.startsWith('http');

  return (
    <a
      href={props.href}
      {...props}
      target="_blank"
      rel={external ? 'noopener noreferrer' : 'noopener noreferrer'}
      className="decoration-retro-magenta/60 hover:decoration-retro-cyan text-retro-cyan hover:text-retro-magenta underline transition-colors"
    >
      {props.children}
    </a>
  );
};

const Heading1Component = (props: any) => (
  <h1 {...props} className="font-pixel text-retro-magenta tracking-tight" />
);

const Heading2Component = (props: any) => (
  <h2 {...props} className="font-pixel text-retro-cyan tracking-tight" />
);

const Heading3Component = (props: any) => (
  <h3 {...props} className="font-pixel text-retro-purple tracking-tight" />
);

const ImageComponent = ({
  src,
  alt,
  openLightbox,
}: {
  src: string;
  alt?: string;
  openLightbox: (src: string, alt?: string) => void;
}) => (
  <span
    data-md-inline-image
    className="pixel-border mx-auto my-6 block max-w-3xl cursor-zoom-in overflow-hidden"
    onClick={() => openLightbox(src, alt)}
  >
    <Image
      src={src}
      alt={alt || 'Image'}
      width={1200}
      height={800}
      className="h-auto w-full object-contain"
      sizes="100vw"
    />
  </span>
);

const IframeComponent = (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => {
  // Normalize iframe presentation: same width constraints & vertical spacing as images.
  // Wrap in aspect-ratio box if width/height not specified or to enforce responsive 16:9.
  const { width: _w, height: _h, className: _c, style: _s, ...rest } = props;

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
};

// Function to transform lists containing only images into galleries
const transformListsToGalleries = (
  root: HTMLElement,
  openLightbox: (src: string, alt?: string) => void,
) => {
  const lists = Array.from(root.querySelectorAll('ul, ol')) as (
    | HTMLUListElement
    | HTMLOListElement
  )[];

  lists.forEach((list) => {
    if (list.dataset.mdGalleryProcessed) return;

    const listItems = Array.from(list.children).filter(
      (el) => el.tagName === 'LI',
    ) as HTMLLIElement[];

    if (listItems.length < 2) return;

    const imageSpans: HTMLSpanElement[] = [];

    // Check if all list items contain only a single image span
    for (const li of listItems) {
      const spanImages = li.querySelectorAll('span[data-md-inline-image]');

      if (spanImages.length !== 1) return; // Not a valid gallery candidate

      // Check for other meaningful text besides the image span
      const clonedLi = li.cloneNode(true) as HTMLElement;
      clonedLi.querySelectorAll('span[data-md-inline-image]').forEach((s) => s.remove());
      const remainingText = clonedLi.textContent?.trim();

      if (remainingText) return; // Has other text, not pure image

      imageSpans.push(spanImages[0] as HTMLSpanElement);
    }

    if (imageSpans.length !== listItems.length) return;

    // Create gallery wrapper
    const galleryWrapper = document.createElement('div');
    galleryWrapper.className = '-mx-4 overflow-x-auto py-2 pl-4';
    galleryWrapper.setAttribute('data-md-gallery', 'true');

    const imageTrack = document.createElement('div');
    imageTrack.className = 'flex gap-4';
    galleryWrapper.appendChild(imageTrack);

    // Insert gallery before the original list
    list.parentElement?.insertBefore(galleryWrapper, list);

    // Create gallery buttons for each image
    imageSpans.forEach((span) => {
      const img = span.querySelector('img');

      if (!img) return;

      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || 'Image';

      const button = document.createElement('button');
      button.type = 'button';
      button.className =
        'relative h-64 w-80 shrink-0 overflow-hidden rounded-sm border border-retro-purple/40 bg-[#0d1122] hover:border-retro-magenta focus:outline-none focus:ring-2 focus:ring-retro-magenta/70';

      const galleryImage = document.createElement('img');
      galleryImage.src = src;
      galleryImage.alt = alt;
      galleryImage.style.width = '100%';
      galleryImage.style.height = '100%';
      galleryImage.style.objectFit = 'cover';
      galleryImage.style.display = 'block';

      button.appendChild(galleryImage);
      button.addEventListener('click', () => openLightbox(src, alt));
      imageTrack.appendChild(button);
    });

    // Mark as processed and hide original list
    list.dataset.mdGalleryProcessed = 'true';
    list.style.display = 'none'; // Keep for React reconciliation but hide visually
  });
};

export function MarkdownRenderer({ content, className }: Props) {
  const { openLightbox } = useLightbox();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Post-render transform: convert image-only lists to galleries
  useEffect(() => {
    const root = containerRef.current;

    if (!root) return;

    transformListsToGalleries(root, openLightbox);
  }, [content, openLightbox]);

  const markdownComponents = {
    pre: PreComponent,
    code: CodeComponent,
    a: LinkComponent,
    h1: Heading1Component,
    h2: Heading2Component,
    h3: Heading3Component,
    // Let native ul/ol render; we'll transform afterward
    img: (props: any) => <ImageComponent {...props} openLightbox={openLightbox} />,
    iframe: IframeComponent,
  };

  return (
    <div
      ref={containerRef}
      className={clsx('prose prose-invert prose-readable w-full', className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism, rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
