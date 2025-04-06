import dynamic from "next/dynamic";
import { Metadata } from "next";
import PageContentDataApi from "@/services/PageDataApi";
import StaffDataApi from "@/services/StaffDataApi";
import MinistryDataApi from "@/services/MinistryDataApi";
import BlogDataApi from "@/services/BlogDataApi";
import { RoutePath, PagesIDs } from "@/constants";
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from "@/constants/mock";
import { getTranslations } from "@/utils/languageParser";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";
import { Text } from "@/ui/components/ui-kit";
import MinistryInfo from "@/ui/components/page-specific/ministry/MinistryInfo/MinistryInfo";
import Container from "@/ui/containers/Container/Container";
import { i18n, Locale } from "@/i18n.config";

import ministryStyles from "@/styles/pages/ministry.module.scss";

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
      ? PagesIDs.KidsMinistry[i18n.defaultLocale]
      : PagesIDs.KidsMinistry.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(
    pageId
  );
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.KidsMinistry,
  });

  return getSeoData({ seoContentData, seoPathData });
}

const PastorsBlog = dynamic(
  () => import("@/ui/components/page-specific/home/PastorsBlog/PastorsBlog")
);
const Staff = dynamic(
  () => import("@/ui/components/page-specific/home/Staff/Staff")
);

export default async function KidsMinistry({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const translations = getTranslations(locale);

  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.KidsMinistry[i18n.defaultLocale]
      : PagesIDs.KidsMinistry.ru;
  const ministryPageId = locale == i18n.defaultLocale ? "788" : "793";

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);
  const postsData = await BlogDataApi.getLastPostsDataHomePageByLang(locale);
  const ministryData = await MinistryDataApi.getMinistryPageData(
    ministryPageId,
    locale
  );

  const ministryInfoData = {
    pageContent: ministryData.pageContent,
    ministryDays: ministryData.ministryDays,
    ministryHours: ministryData.ministryHours,
    ministryShortDescription: ministryData.ministryShortDescription,
    ministryImagesData: ministryData.ministryImagesData,
  };

  return (
    <>
      <Container>
        <Text textType="h1" className={ministryStyles.ministry__title}>
          {title}
        </Text>
      </Container>

      <div className={ministryStyles["ministry__page-content"]}>
        <MinistryInfo translations={translations} data={ministryInfoData} />

        <Staff data={staffData} translations={translations} />

        <PastorsBlog data={postsData} translations={translations} />
      </div>
    </>
  );
}
