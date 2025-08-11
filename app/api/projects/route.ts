import { NextResponse } from "next/server";
import { getProjects } from "@/lib/directus";

export const revalidate = 120; // 2 minutes

export async function GET() {
  const data = await getProjects();
  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=60",
    },
  });
}
