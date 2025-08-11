import { NextResponse } from "next/server";
import { getGalleries } from "@/lib/directus";
import { PageProps } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: PageProps }) {
  const { slug } = await params;
  const galleries = await getGalleries();
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: gallery });
}
