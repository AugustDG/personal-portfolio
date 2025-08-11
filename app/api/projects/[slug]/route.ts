import { NextResponse } from "next/server";
import { getProjects } from "@/lib/directus";
import { PageProps } from "@/lib/types";

export const revalidate = 120; // follow list cache

export async function GET(_req: Request, { params }: { params: PageProps }) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project)
    return new NextResponse(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  return new NextResponse(JSON.stringify({ data: project }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
    },
  });
}
