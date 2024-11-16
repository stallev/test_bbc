import { Locale } from "@/i18n.config"

export interface PathProps {
  params: {
    postSlug: string
  }
}

export interface TranslationsType {
  translations: Record<string, string>
}

export interface PagePathDataProps {
  path: string
  locale: Locale
}

export interface SeoPagePathDataProps {
  asPath: string,
  locale: Locale
  defaultLocale: Locale
}
