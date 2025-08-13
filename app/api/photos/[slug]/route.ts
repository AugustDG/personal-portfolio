import { NextResponse } from "next/server";
import { getPhotoGalleries } from "@/lib/directus";
import { PageProps } from "@/lib/types";

export const revalidate = 300; // photos longer cache

export const runtime = "edge";

export async function GET(_req: Request, { params }: { params: PageProps }) {
  const { slug } = await params;
  const allPhotos = await getPhotoGalleries();
  const photos = allPhotos.find((g) => g.slug === slug);

  if (!photos)
    return new NextResponse(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });

  return new NextResponse(JSON.stringify({ data: photos }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
