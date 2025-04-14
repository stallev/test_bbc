import { Metadata } from 'next';

import { RoutePath, PagesIDs } from '@/constants';
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import StaffDataApi from '@/services/StaffDataApi';
import styles from '@/styles/pages/staff.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import StaffList from '@/ui/components/page-specific/staff/StaffList/StaffList';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({
    locale: locale,
  }));
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.Staff[i18n.defaultLocale] : PagesIDs.Staff.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Staff,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Staff(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const translations = getTranslations(locale);

  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.Staff[i18n.defaultLocale] : PagesIDs.Staff.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);

  return (
    <>
      <Container>
        <Text textType="h1" className={styles.staff__title}>
          {title}
        </Text>
      </Container>

      <Container isNarrowContent>
        <StaffList translations={translations} data={staffData} isDetailed />
      </Container>
    </>
  );
}
