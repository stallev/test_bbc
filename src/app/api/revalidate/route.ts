import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { i18n } from '@/i18n.config';

export async function GET(req: Request) {
  const { locales } = i18n;
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('path');
  const token = searchParams.get('token');

  if (token !== 'Reval234_DsToken') {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!url) {
    return NextResponse.json({ message: 'Path is required' }, { status: 401 });
  }

  const localePattern = new RegExp(`^/(${locales.join('|')})(/|$)`);

  const match = url.match(localePattern);
  const pathnameWithoutLocale = match ? url.replace(localePattern, '/') : url;

  revalidatePath(pathnameWithoutLocale === '/' ? '/ru' : `/ru${pathnameWithoutLocale}`);
  revalidatePath(pathnameWithoutLocale);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    paths: [`/ru${pathnameWithoutLocale}`, pathnameWithoutLocale],
  });
}
