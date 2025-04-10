import { DEFAULT_FEATURED_IMAGE } from '@/constants/mock';
import { i18n } from '@/i18n.config';
import { SeoContentDataProps, PagePathDataProps, SeoPagePathDataProps } from '@/types/globalTypes';

export const getPostSeoData = (data: any, locale: string) => {
  const featuredImageUrl = !!data.featuredImage
    ? data.featuredImage.node.mediaItemUrl
    : DEFAULT_FEATURED_IMAGE;
  const otherLanguageCode = data.translations[0].language.code.toLowerCase();
  const otherTranslationSlug = data.translations[0].slug;

  const seo: SeoContentDataProps = {
    data: {
      ...data.seo,
      featuredImageUrl,
      title: data.title,
      slug: data.slug,
      alternateLinksSlugs: {
        [locale]: data.slug,
        [otherLanguageCode]: otherTranslationSlug,
      },
    },
    isPostType: true,
  };

  return seo;
};

export const getPagePathData = ({ path, locale }: PagePathDataProps): SeoPagePathDataProps => {
  const { defaultLocale } = i18n;
  return {
    asPath: defaultLocale === locale ? path : `/${locale}${path}`,
    locale,
    defaultLocale,
  };
};
