import Link from 'next/link';
import Image from 'next/image';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { getBlogs } from '@/lib/directus';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const base = process.env.PUBLIC_URL?.replace(/\/$/, '') || '';
  const canonical = `${base}/blog`;

  return {
    title: 'Blog - Augusto Pinheiro',
    description: 'Thoughts and tutorials on software development. Some poems too ;)',
    alternates: {
      canonical,
      types: { 'application/rss+xml': '/blog/rss.xml' },
    },
    openGraph: {
      type: 'website',
      title: 'Blog - Augusto Pinheiro',
      description: 'Thoughts and tutorials on software development. Some poems too ;)',
      url: canonical,
    },
    twitter: {
      card: 'summary',
      title: 'Blog - Augusto Pinheiro',
      description: 'Thoughts and tutorials on software development. Some poems too ;)',
    },
  };
}

export default async function BlogIndex() {
  const posts = await getBlogs();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-pixel text-5xl font-semibold tracking-tight">
          <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent">
            Blog
          </span>
          <span className="from-retro-magenta via-retro-purple/60 bg-linear-to-r mt-4 block h-1 w-48 to-transparent" />
        </h1>
        <div>
          <a
            href="/blog/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="border-retro-magenta/60 text-retro-magenta hover:border-retro-yellow hover:text-retro-yellow focus:ring-retro-yellow/70 inline-flex items-center gap-1 rounded-sm border bg-[#1b2140] px-3 py-1 font-mono text-[11px] uppercase tracking-wide shadow-[0_0_0_2px_#ff00ff,3px_3px_0_0_#00fff6] transition hover:shadow-[0_0_0_2px_#ffe600,3px_3px_0_0_#ff00ff] focus:outline-none focus:ring-2"
            aria-label="Subscribe to Blog RSS feed"
          >
            <span className="hidden sm:inline">Subscribe</span>
            <span className="sm:hidden">RSS</span>
            <span aria-hidden>📡</span>
          </a>
        </div>
      </div>
      <ul className="space-y-3">
        {posts.map((p, i) => (
          <StaggerItem index={i} key={p.id} as="li">
            <div className="border-retro-purple/40 hover:border-retro-magenta group relative overflow-hidden rounded-sm border bg-[#12162b] transition-colors">
              <Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                <div className="relative h-40 w-full overflow-hidden">
                  {p.header_image_thumbnail_url ? (
                    <>
                      <Image
                        src={p.header_image_thumbnail_url}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={i < 2}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="from-retro-magenta via-retro-purple to-retro-cyan bg-linear-to-br h-full w-full opacity-30" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex-1 space-y-2">
                    <h2 className="text-retro-magenta group-hover:text-retro-yellow line-clamp-2 font-semibold tracking-wide transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-retro-cyan/70 font-mono text-[10px] md:text-[11px]">
                      {p.published_at || p.updated_at}
                    </p>
                    <p className="text-retro-cyan/90 line-clamp-2 text-xs leading-relaxed opacity-80 md:text-[13px]">
                      {p.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </StaggerItem>
        ))}
        {!posts.length && <li className="opacity-60">No posts yet.</li>}
      </ul>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Blog',
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: `/blog/${p.slug}`,
              datePublished: p.published_at,
              dateModified: p.updated_at,
              description: p.excerpt,
            })),
          }),
        }}
      />
    </div>
  );
}
