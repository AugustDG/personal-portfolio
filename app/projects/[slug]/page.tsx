import { getProjects } from "@/lib/directus";
import { notFound } from "next/navigation";

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
      <header className="space-y-4">
        <h1 className="font-pixel text-3xl pixel-border inline-block bg-retro-purple text-white px-4 py-3">
          {project.title}
        </h1>
        <p className="max-w-prose">{project.description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {project.tags?.map((t) => (
            <span key={t} className="pixel-border px-2 py-1 bg-white">
              {t}
            </span>
          ))}
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="pixel-border bg-white p-4 space-y-2">
          <h2 className="font-bold">Timeline</h2>
          <p className="text-xs">
            {project.started_at} — {project.ended_at || "Present"}
          </p>
        </div>
        <div className="pixel-border bg-white p-4 space-y-2">
          <h2 className="font-bold">Collaborators</h2>
          <p className="text-xs">
            {project.collaborators?.join(", ") || "Solo"}
          </p>
        </div>
        <div className="pixel-border bg-white p-4 space-y-2">
          <h2 className="font-bold">Tools</h2>
          <p className="text-xs">{project.tools?.join(", ")}</p>
        </div>
      </section>
      <section className="prose max-w-none">
        {/* TODO: render rich content w/ MDX or blocks */}
        <pre>{project.body.slice(0, 500)}</pre>
      </section>
    </article>
  );
}
