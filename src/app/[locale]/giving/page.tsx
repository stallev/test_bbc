import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { RoutePath, PagesIDs } from '@/constants';
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import { PagePathProps } from '@/types/globalTypes';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

const Donation = dynamic(() => import('@/ui/components/Donation/Donation'));

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({
    locale: locale,
  }));
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata({ params: { locale } }: PagePathProps): Promise<Metadata> {
  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.Giving[i18n.defaultLocale] : PagesIDs.Giving.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Giving,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Giving({ params: { locale } }: { params: { locale: Locale } }) {
  const translations = getTranslations(locale);

  return (
    <>
      <Container>
        <Donation isDonationPage={true} translations={translations} />
      </Container>
    </>
  );
}
