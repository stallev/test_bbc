
import { useParams } from 'next/navigation'
import { Locale } from "@/i18n.config";
import { getTranslations } from '@/utils/languageParser';

export const useLocale = () => {
  const params = useParams();
  return params.locale as Locale;
};

export const useClientTranslationFunction = () => {
  const locale = useLocale();
  const translations = getTranslations(locale);

  const t = (key: string) => {
    if(key in translations) {
      return translations[key as keyof typeof translations]
    }

    return key;
  }

  return t;
}