import { NextRequest, NextResponse } from 'next/server';

import { LANGUAGE_COOKIE_NAME, LANGUAGE_COOKIE_MAX_AGE } from '@/constants/generalAppConstants';
import { i18n } from '@/i18n.config';

const setLanguageCookie = (response: NextResponse, locale: string) => {
  response.cookies.set(LANGUAGE_COOKIE_NAME, locale, {
    maxAge: LANGUAGE_COOKIE_MAX_AGE,
    path: '/',
  });
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const existedLocaleInPathname = i18n.locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (existedLocaleInPathname) {
    const response = NextResponse.next();
    setLanguageCookie(response, existedLocaleInPathname);
    return response;
  }

  let locale = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;

  if (!locale) {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const language = acceptLanguage.substring(0, 2);

      locale = i18n.locales.find(l => language.includes(l)) || i18n.defaultLocale;
    } else {
      locale = i18n.defaultLocale;
    }
  }

  if (locale !== i18n.defaultLocale) {
    const newPathname = `/${locale}${pathname}`;
    const redirectResponse = NextResponse.redirect(new URL(newPathname, request.url));
    setLanguageCookie(redirectResponse, locale);

    return redirectResponse;
  }

  const response = NextResponse.next();
  setLanguageCookie(response, locale);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
  ],
};
