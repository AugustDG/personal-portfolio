import { NextResponse } from 'next/server';
import { getSiteMeta } from '@/lib/directus';

// Cache for 10 minutes (align with internal TTL) and allow 1 minute stale while revalidating
export const revalidate = 600; // ISR-like caching for this Route Handler

export async function GET() {
  const data = await getSiteMeta();

  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
    },
  });
}
