import { NextResponse } from 'next/server';
import { getProject } from '@/lib/directus';
import { PageProps } from '@/lib/types';

export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 120; // follow list cache

export const runtime = 'edge';

export async function GET(_req: Request, { params }: { params: PageProps }) {
  const { slug } = await params;
  const project = getProject(slug);

  const dev = process.env.NODE_ENV === 'development';

  if (!project)
    return new NextResponse(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: {
        'Cache-Control': dev
          ? 'no-store, no-cache, must-revalidate'
          : 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });

  return new NextResponse(JSON.stringify({ data: project }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': dev
        ? 'no-store, no-cache, must-revalidate'
        : 'public, s-maxage=120, stale-while-revalidate=60',
    },
  });
}
