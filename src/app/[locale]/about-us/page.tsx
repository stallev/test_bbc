import { Metadata } from "next";
import PageContentDataApi from "@/services/PageDataApi";
import StaffDataApi from "@/services/StaffDataApi";
import { RoutePath, PagesIDs } from "@/constants";
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from "@/constants/mock";
import { getTranslations } from "@/utils/languageParser";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";
import { Text } from "@/ui/components/ui-kit";
import Staff from "@/ui/components/page-specific/home/Staff/Staff";
import Timeline from "@/ui/components/page-specific/about/Timeline/Timeline";
import Mission from "@/ui/components/page-specific/about/Mission/Mission";
import { MAP_IDs } from "@/constants/mock";
import MapLocation from "@/ui/components/MapLocation/MapLocation";
import FixedPageLink from "@/ui/components/FixedPageLink/FixedPageLink";
import Container from "@/ui/containers/Container/Container";
import { i18n, Locale } from "@/i18n.config";

import styles from "@/styles/pages/about-us.module.scss";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale: locale,
  }));
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata({
  params: { locale },
}: PagePathProps): Promise<Metadata> {
  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.AboutUs[i18n.defaultLocale]
      : PagesIDs.AboutUs.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(
    pageId
  );
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.AboutUs,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function AboutUs({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const translations = getTranslations(locale);

  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.AboutUs[i18n.defaultLocale]
      : PagesIDs.AboutUs.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const {
    about_us_data: { timeline_data },
    mission_data,
  } = await PageContentDataApi.getAboutUsData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);

  return (
    <>
      <FixedPageLink
        link={RoutePath.Giving}
        iconName="donateIcon"
        label="Giving"
      />

      <Container>
        <Text textType="h1" className={styles["about-us__title"]}>
          {title}
        </Text>
      </Container>

      <div className={styles["about-us__page-content"]}>
        <Timeline data={timeline_data} />

        <Mission data={mission_data} />

        <Container>
          <Staff data={staffData} translations={translations} />
        </Container>
        <MapLocation mapId={MAP_IDs.homePage} />
      </div>
    </>
  );
}
