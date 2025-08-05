import { NextResponse } from "next/server";
import { getAllGalleries } from "@/lib/cms-server";

export async function GET() {
  try {
    const galleries = await getAllGalleries();
    return NextResponse.json(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}
