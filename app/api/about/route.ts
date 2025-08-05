import { NextResponse } from "next/server";
import { getAboutContent } from "@/lib/cms-server";

export async function GET() {
  try {
    const about = await getAboutContent();
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about content:", error);
    return NextResponse.json(
      { error: "Failed to fetch about content" },
      { status: 500 }
    );
  }
}
