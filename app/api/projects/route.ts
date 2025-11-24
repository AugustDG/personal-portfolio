import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/directus';

export const revalidate = 60; // 1 minute

export async function GET() {
  const data = await getProjects();

  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
