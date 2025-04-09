import { translations } from '@/i18n/translations';
import { i18n, Locale } from '@/i18n.config';

export const getTranslations = (locale: Locale) => {
  return translations[locale];
};

export const getServerTranslationFunction = (locale: Locale) => {
  const translations = getTranslations(locale);

  const t = (key: string) => {
    if (key in translations) {
      return translations[key as keyof typeof translations];
    }

    return '';
  };

  return t;
};

export const getPathnameParams = (
  url: string
): {
  pathnameWithoutLocale: string;
  locale: string;
  isDefaultLocale: boolean;
} => {
  const { defaultLocale, locales } = i18n;
  const localePattern = new RegExp(`^/(${locales.join('|')})(/|$)`);

  const match = url.match(localePattern);
  const locale = match ? match[1] : defaultLocale;
  const pathnameWithoutLocale = match ? url.replace(localePattern, '/') : url;

  return {
    pathnameWithoutLocale,
    locale: locale === defaultLocale ? defaultLocale : locale,
    isDefaultLocale: locale === defaultLocale,
  };
};
