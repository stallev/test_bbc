export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ru'] as const
} as const

export type Locale = (typeof i18n)['locales'][number]
