import { headers } from 'next/headers';

import { i18n, Locale } from '@/i18n.config';

export const getLocaleFromPath = async (): Promise<Locale> => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && i18n.locales.includes(segments[0] as Locale)) {
    return segments[0] as Locale;
  }

  return i18n.defaultLocale;
};
