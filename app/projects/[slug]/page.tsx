import { getProjects } from "@/lib/directus";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <article className="space-y-8 animate-fadeIn">
      <header className="space-y-6">
        {project.header_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.header_image_url}
            alt={project.title}
            className="w-full aspect-[16/7] object-cover rounded-sm border border-retro-purple/40 mb-4"
            loading="lazy"
          />
        )}
        <h1 className="font-pixel text-4xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-retro-magenta via-retro-yellow to-retro-cyan bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.4)]">
            {project.title}
          </span>
          <span className="block h-1 mt-5 w-72 bg-gradient-to-r from-retro-magenta via-retro-purple/50 to-transparent" />
        </h1>
        <p className="max-w-prose text-retro-cyan font-body leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((t) => (
            <TagPill key={t} tag={t} />
          ))}
        </div>
      </header>
      <section className="grid gap-5 md:grid-cols-3">
        <div className="bg-[#12162b] border border-retro-purple/40 rounded-sm p-4 space-y-2">
          <h2 className="font-bold">Timeline</h2>
          <p className="text-xs text-retro-cyan">
            {project.started_at} — {project.ended_at || "Present"}
          </p>
        </div>
        <div className="bg-[#12162b] border border-retro-purple/40 rounded-sm p-4 space-y-2">
          <h2 className="font-bold">Collaborators</h2>
          <p className="text-xs text-retro-cyan">
            {project.collaborators?.join(", ") || "Solo"}
          </p>
        </div>
        <div className="bg-[#12162b] border border-retro-purple/40 rounded-sm p-4 space-y-2">
          <h2 className="font-bold">Tools</h2>
          <p className="text-xs text-retro-cyan">{project.tools?.join(", ")}</p>
        </div>
      </section>
      <section>
        <MarkdownRenderer content={project.body || ""} />
      </section>
    </article>
  );
}
