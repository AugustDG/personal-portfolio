"use client";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TagPill } from "@/components/TagPill";
import { motion } from "framer-motion";
import { useApi } from "@/lib/hooks/useApi";
import type { Project } from "@/lib/directus";
import React from "react";
import { PageProps } from "@/lib/types";

export default function ProjectDetail({ params }: { params: PageProps }) {
  const { slug } = React.use(params);
  const {
    data: project,
    isLoading,
    error,
  } = useApi<Project>(`/api/projects/${slug}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <header className="space-y-6">
        {isLoading && (
          <p className="text-retro-cyan text-sm opacity-70">Loading…</p>
        )}
        {error && <p className="text-retro-magenta text-sm">Failed to load.</p>}
        {!isLoading && !error && !project && (
          <p className="opacity-60">Not found.</p>
        )}
        {project?.header_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.header_image_url}
            alt={project.title}
            className="border-retro-purple/40 mb-4 aspect-16/7 w-full rounded-sm border object-cover"
            loading="lazy"
          />
        )}
        {project && (
          <>
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
          </>
        )}
      </header>
      {project && (
        <section className="grid gap-5 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border-retro-purple/40 space-y-2 rounded-sm border bg-[#12162b] p-4"
          >
            <h2 className="font-bold">Timeline</h2>
            <p className="text-retro-cyan text-xs">
              {project.started_at} — {project.ended_at || "Present"}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="border-retro-purple/40 space-y-2 rounded-sm border bg-[#12162b] p-4"
          >
            <h2 className="font-bold">Collaborators</h2>
            <p className="text-retro-cyan text-xs">
              {project.collaborators?.join(", ") || "Solo"}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.26 }}
            className="border-retro-purple/40 space-y-2 rounded-sm border bg-[#12162b] p-4"
          >
            <h2 className="font-bold">Tools</h2>
            <p className="text-retro-cyan text-xs">
              {project.tools?.join(", ")}
            </p>
          </motion.div>
        </section>
      )}
      {project && (
        <section>
          <MarkdownRenderer content={project.body || ""} />
        </section>
      )}
    </motion.article>
  );
}
