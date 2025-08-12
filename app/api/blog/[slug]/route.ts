import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/directus";
import { PageProps } from "@/lib/types";

export const revalidate = 120;
export const runtime = "edge";

export async function GET(_req: Request, { params }: { params: PageProps }) {
  const { slug } = await params;
  const posts = await getBlogs();
  const post = posts.find((p) => p.slug === slug);
  if (!post)
    return new NextResponse(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  return new NextResponse(JSON.stringify({ data: post }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
    },
  });
}
