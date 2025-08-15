import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/directus';

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 120; // disable ISR in dev

export async function GET() {
  const data = await getBlogs();

  const dev = process.env.NODE_ENV === 'development';

  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': dev
        ? 'no-store, no-cache, must-revalidate'
        : 'public, s-maxage=120, stale-while-revalidate=60',
    },
  });
}
