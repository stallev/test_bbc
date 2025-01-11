
import { useParams, usePathname } from 'next/navigation';
import { i18n, Locale } from "@/i18n.config";
import { getTranslations } from '@/utils/languageParser';

export const useLocale = () => {
  const pathname = usePathname();
  const possibleLang = pathname.split("/")[1];

  const locale = i18n.locales.includes(possibleLang as Locale)
    ? (possibleLang as Locale)
    : i18n.defaultLocale;

  return locale as Locale;
};

export const useClientTranslationFunction = () => {
  const locale = useLocale();
  const translations = getTranslations(locale);

  const translate = (key: string) => {
    if(!!translations && key in translations) {
      return translations[key as keyof typeof translations]
    }

    return key;
  }

  return translate;
}