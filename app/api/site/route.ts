import { NextResponse } from "next/server";
import { getSiteMeta } from "@/lib/directus";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSiteMeta();
  return NextResponse.json({ data });
}
