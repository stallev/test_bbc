import { Metadata } from 'next';
import { RoutePath, PagesIDs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import MinistryDataApi from '@/services/MinistryDataApi';
import { PagePathProps } from '@/types/globalTypes';
import MinistryPageContent from '@/ui/components/page-specific/ministry/MinistryPageContent/MinistryPageContent';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 300;

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const pageId =
    locale === i18n.defaultLocale
      ? PagesIDs.FamilyMinistry[i18n.defaultLocale]
      : PagesIDs.FamilyMinistry.ru;
  const { seo: seoContentData } = await MinistryDataApi.getMinistryPageData(pageId, locale);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.FamilyMinistry,
  });
  return getSeoData({ seoContentData, seoPathData });
}

export default async function FamilyMinistry(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;
  const { locale } = params;
  const translations = getTranslations(locale);

  const pageId =
    locale === i18n.defaultLocale
      ? PagesIDs.FamilyMinistry[i18n.defaultLocale]
      : PagesIDs.FamilyMinistry.ru;

  const { ministryInfoData } = await MinistryDataApi.getMinistryPageData(pageId, locale);

  return <MinistryPageContent ministryInfoData={ministryInfoData} translations={translations} />;
}
