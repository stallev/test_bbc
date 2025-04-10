import { i18n } from '@/i18n.config';

export const slugSelector = (lang: string, href: string) => {
  const defaultLang = i18n.defaultLocale;
  lang = lang === defaultLang ? '' : lang.replace(/^\/|\/$/g, '');
  href = href.replace(/^\/|\/$/g, '');

  if (lang !== '') {
    lang = `/${lang}`;
  }

  return `${lang}/${href}`;
};
