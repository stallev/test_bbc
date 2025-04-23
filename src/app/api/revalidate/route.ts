import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('path');
  const token = searchParams.get('token');

  if (token !== 'Reval234_DsToken') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!url) {
    return NextResponse.json({ message: 'Path is required' }, { status: 401 });
  }

  // revalidatePath(url);
  revalidateTag('youtube');

  return NextResponse.json(
    {
      revalidated: true,
      now: new Date().toUTCString(),
      path: url,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    }
  );
}
