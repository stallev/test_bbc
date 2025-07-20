import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  const ministryPageData = await MinistryDataApi.getMinistryPageData(postSlug, locale);
  const seoContentData = ministryPageData?.data?.seo;
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

  const ministryPageData = await MinistryDataApi.getMinistryPageData(postSlug, locale);
  const ministryInfoData = ministryPageData?.data?.ministryInfoData;

  if (!ministryInfoData || ministryPageData?.notFound) {
    return notFound();
  }

  return <MinistryPageContent ministryInfoData={ministryInfoData} translations={translations} />;
}
