import { NextResponse } from "next/server";
import { getPhotos } from "@/lib/directus";
import { PageProps } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: PageProps }) {
  const { slug } = await params;
  const galleries = await getPhotos();
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: gallery });
}
