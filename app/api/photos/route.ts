import { NextResponse } from "next/server";
import { getPhotos } from "@/lib/directus";

export const revalidate = 300; // 5 minutes

export async function GET() {
  const data = await getPhotos();

  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
