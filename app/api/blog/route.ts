import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/directus";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getBlogs();
  return NextResponse.json({ data });
}
