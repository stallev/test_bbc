import { Metadata } from 'next';
import PageContentDataApi from "@/services/PageDataApi";
import StaffDataApi from "@/services/StaffDataApi";
import { RoutePath, PagesIDs } from "@/constants";
import { getTranslations } from "@/utils/languageParser";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";
import { Text } from "@/ui/components/ui-kit";
import StaffList from "@/ui/components/page-specific/staff/StaffList/StaffList";
import Container from "@/ui/containers/Container/Container";
import { i18n, Locale } from "@/i18n.config";

import styles from "@/styles/pages/staff.module.scss";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale: locale,
  }));
}

export const revalidate = 10 * 60;

export async function generateMetadata(
  { params: { locale } }: PagePathProps
): Promise<Metadata> {
  const pageId = locale == i18n.defaultLocale ? PagesIDs.Staff[i18n.defaultLocale] : PagesIDs.Staff.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Staff
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Staff({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const translations = getTranslations(locale);

  const pageId = locale == i18n.defaultLocale ? PagesIDs.Staff[i18n.defaultLocale] : PagesIDs.Staff.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);

  return (
    <>
      <Container>
        <Text
          textType="h1"
          className={styles.staff__title}
        >
          {title}
        </Text>
      </Container>
      
      <Container isNarrowContent>
        <StaffList translations={translations} data={staffData} isDetailed />
      </Container>
    </>
  )
}
