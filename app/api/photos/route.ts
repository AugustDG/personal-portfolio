import { NextResponse } from 'next/server';
import { getPhotoGalleries } from '@/lib/directus';

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 300; // disable in dev

export async function GET() {
  const data = await getPhotoGalleries();

  const dev = process.env.NODE_ENV === 'development';
  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': dev
        ? 'no-store, no-cache, must-revalidate'
        : 'public, s-maxage=300, stale-while-revalidate=60',
    },
  });
}
