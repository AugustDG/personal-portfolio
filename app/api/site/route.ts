import { NextResponse } from 'next/server';
import { getSiteMeta } from '@/lib/directus';

// Cache for 10 minutes (align with internal TTL) and allow 1 minute stale while revalidating; disabled in dev
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 600; // ISR-like caching for this Route Handler

export async function GET() {
  const data = await getSiteMeta();

  const dev = process.env.NODE_ENV === 'development';
  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': dev
        ? 'no-store, no-cache, must-revalidate'
        : 'public, s-maxage=600, stale-while-revalidate=60',
    },
  });
}
