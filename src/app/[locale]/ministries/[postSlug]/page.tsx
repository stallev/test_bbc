import { Metadata } from 'next';
import { cache } from 'react';
import { RoutePath } from '@/constants/RoutePath';
import { Locale, i18n } from '@/i18n.config';
import MinistryDataApi from '@/services/MinistryDataApi';
import { PostParams } from '@/types/postTypes';
import MinistryPageContent from '@/ui/components/page-specific/ministry/MinistryPageContent/MinistryPageContent';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  const postsSlugsData = await MinistryDataApi.getMinistriesSitemapData();

  return postsSlugsData.flatMap((post: { slug: string; modified: string }) =>
    i18n.locales.map((locale: Locale) => ({
      locale,
      postSlug: post.slug,
    }))
  );
}

export const revalidate = 600;

const getMinistryPageData = cache(async (slug: string, locale: Locale) => {
  return await MinistryDataApi.getMinistryPageData(slug, locale);
});

export async function generateMetadata(props: { params: Promise<PostParams> }): Promise<Metadata> {
  const params = await props.params;
  const { locale, postSlug } = params;
  const ministryPageData = await getMinistryPageData(postSlug, locale);
  const seoContentData = ministryPageData?.seo;
  const seoPathData = getPagePathData({
    locale,
    path: `${RoutePath.Ministries}/${postSlug}`,
  });
  return getSeoData({ seoContentData, seoPathData });
}

export default async function PostMinistry(props: { params: Promise<PostParams> }) {
  const params = await props.params;
  const { locale, postSlug } = params;
  const translations = getTranslations(locale);

  const { ministryInfoData } = await getMinistryPageData(postSlug, locale);

  return <MinistryPageContent ministryInfoData={ministryInfoData} translations={translations} />;
}
