import { Metadata } from 'next';
import { RoutePath } from '@/constants/RoutePath';
import MinistryDataApi from '@/services/MinistryDataApi';
import { PostParams } from '@/types/postTypes';
import MinistryPageContent from '@/ui/components/page-specific/ministry/MinistryPageContent/MinistryPageContent';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<PostParams> }): Promise<Metadata> {
  const params = await props.params;
  const { locale, postSlug } = params;
  const { seo: seoContentData } = await MinistryDataApi.getMinistryPageData(postSlug, locale);
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

  const { ministryInfoData } = await MinistryDataApi.getMinistryPageData(postSlug, locale);

  return <MinistryPageContent ministryInfoData={ministryInfoData} translations={translations} />;
}
