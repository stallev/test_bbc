import { Locale } from '@/i18n.config';
// import PageContentDataApi from '@/services/PageDataApi';
import { getPagePathData } from './getPostSeoData';
import { getSeoData } from './getSeoData';
import { getTranslations } from './languageParser';

interface GetPageSeoDataProps {
  pageSlug: string;
  locale: Locale;
  pagePath: string;
}

export const getPageSeoData = async ({ pageSlug, locale, pagePath }: GetPageSeoDataProps) => {
  const translations = getTranslations(locale);

  // try {
  // const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageSlug);

  // const seoPathData = getPagePathData({
  //   locale,
  //   path: pagePath,
  // });

  // return getSeoData({ seoContentData, seoPathData });
  // } catch (error) {
  // console.error('Error fetching page metadata:', error);

  const seoPathData = getPagePathData({
    locale,
    path: pagePath,
  });

  return getSeoData({
    seoContentData: {
      data: {
        title: translations.home_title,
        metaDesc: translations.site_description,
        slug: pageSlug,
        featuredImageUrl: '/default-og-image.jpg',
        twitterDescription: translations.site_description,
      },
      isPostType: false,
    },
    seoPathData,
  });
  // }
};
