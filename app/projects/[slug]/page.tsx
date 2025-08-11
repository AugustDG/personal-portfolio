import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";
import type { Metadata } from "next";
import { getProject } from "@/lib/directus";
import { PageProps } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Not found" };

  const base = process.env.PUBLIC_URL?.replace(/\/$/, "") || "";
  const canonical = `${base}/projects/${project.slug}`;
  const desc = project.description?.slice(0, 155) || project.title;

  return {
    title: `${project.title} – Augusto Pinheiro`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: project.title,
      description: desc,
      url: canonical,
      images: project.header_image_url
        ? [{ url: project.header_image_url }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: desc,
      images: project.header_image_url ? [project.header_image_url] : undefined,
    },
  };
}

export default async function ProjectDetail({ params }: { params: PageProps }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return <p className="opacity-60">Not found.</p>;

  return (
    <article className="space-y-8">
      <header className="space-y-6">
        {project.header_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.header_image_url}
            alt={project.title}
            className="border-retro-purple/40 mb-4 aspect-16/7 w-full rounded-sm border object-cover"
            loading="lazy"
          />
        )}
        <h1 className="font-pixel text-4xl font-semibold tracking-tight">
          <span className="from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.4)]">
            {project.title}
          </span>
          <span className="from-retro-magenta via-retro-purple/50 mt-5 block h-1 w-72 bg-linear-to-r to-transparent" />
        </h1>
        <p className="text-retro-cyan font-body max-w-prose leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
        </div>
      </header>
      <section className="grid gap-5 md:grid-cols-3">
        <div className="border-retro-purple/40 space-y-2 rounded-sm border bg-[#12162b] p-4">
          <h2 className="font-bold">Timeline</h2>
          <p className="text-retro-cyan text-xs">
            {project.started_at} — {project.ended_at || "Present"}
          </p>
        </div>
        <div className="border-retro-purple/40 space-y-2 rounded-sm border bg-[#12162b] p-4">
          <h2 className="font-bold">Collaborators</h2>
          <p className="text-retro-cyan text-xs">
            {project.collaborators?.join(", ") || "Solo"}
          </p>
        </div>
        <div className="border-retro-purple/40 space-y-2 rounded-sm border bg-[#12162b] p-4">
          <h2 className="font-bold">Tools</h2>
          <p className="text-retro-cyan text-xs">{project.tools?.join(", ")}</p>
        </div>
      </section>
      <section>
        <MarkdownRenderer content={project.body || ""} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: project.title,
            description: project.description,
            dateCreated: project.started_at,
            dateModified: project.ended_at || project.started_at,
            author: { "@type": "Person", name: "Augusto Pinheiro" },
            keywords: project.tags?.join(", "),
          }),
        }}
      />
    </article>
  );
}
