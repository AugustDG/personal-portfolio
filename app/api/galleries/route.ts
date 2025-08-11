import { NextResponse } from "next/server";
import { getPhotos } from "@/lib/directus";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPhotos();
  return NextResponse.json({ data });
}
