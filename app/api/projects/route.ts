import { NextResponse } from "next/server";
import { getProjects } from "@/lib/directus";

export const dynamic = "force-dynamic"; // always fetch fresh

export async function GET() {
  const data = await getProjects();
  return NextResponse.json({ data });
}
