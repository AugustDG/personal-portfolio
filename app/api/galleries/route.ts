import { NextResponse } from "next/server";
import { getGalleries } from "@/lib/directus";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getGalleries();
  return NextResponse.json({ data });
}
