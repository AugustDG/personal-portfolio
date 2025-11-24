import { NextResponse } from 'next/server';
import { getSiteMeta } from '@/lib/directus';

// Cache for 1 minute and allow 30 seconds stale while revalidating
export const revalidate = 60; // ISR-like caching for this Route Handler

export async function GET() {
  const data = await getSiteMeta();

  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
