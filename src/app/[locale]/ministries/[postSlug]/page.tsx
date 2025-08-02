import { Metadata } from 'next';
import { RoutePath } from '@/constants/RoutePath';
import MinistryDataApi from '@/services/MinistryDataApi';
import { PostParams } from '@/types/postTypes';
import MinistryPageWrapper from '@/ui/components/page-specific/ministry/MinistryPageWrapper/MinistryPageWrapper';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<PostParams> }): Promise<Metadata> {
  const params = await props.params;
  const { locale, postSlug } = params;
  const ministryPageData = await MinistryDataApi.getMinistryPageData(postSlug, locale);
  const seoContentData = ministryPageData?.seo;
  const seoPathData = getPagePathData({
    locale,
    path: `${RoutePath.Ministries}/${postSlug}`,
  });
  return getSeoData({ seoContentData, seoPathData });
}

export default async function PostMinistry(props: { params: Promise<PostParams> }) {
  const { postSlug, locale } = await props.params;
  return <MinistryPageWrapper postSlug={postSlug} locale={locale} />;
}
