import { Metadata } from "next";
import PageContentDataApi from "@/services/PageDataApi";
import SermonsDataApi from "@/services/SermonsDataApi";
import { RoutePath, PagesIDs } from "@/constants";
import { getTranslations } from "@/utils/languageParser";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import Container from "@/ui/containers/Container/Container";
import MediaPageHeader from "@/ui/components/page-specific/media/MediaPageHeader/MediaPageHeader";
import SermonsContent from "@/ui/components/page-specific/sermons/SermonsContent/SermonsContent";
import { PagePathProps } from "@/types/globalTypes";
import { Text } from "@/ui/components/ui-kit";
import { i18n, Locale } from "@/i18n.config";

import styles from "@/styles/pages/sermons.module.scss";

export const revalidate = 5 * 60;

export async function generateMetadata({
  params: { locale },
}: PagePathProps): Promise<Metadata> {
  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.Sermons[i18n.defaultLocale]
      : PagesIDs.Sermons.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(
    pageId
  );
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.LiveStreams,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Sermons({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const translations = getTranslations(locale);

  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.Sermons[i18n.defaultLocale]
      : PagesIDs.Sermons.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const sermonsData = await SermonsDataApi.getSermonsList(locale);
  const categories = await SermonsDataApi.getSermonsCategories(locale);

  return (
    <>
      <Container>
        <MediaPageHeader isLivestreamPage={false} translations={translations} />
      </Container>
      
      <SermonsContent
        contentData={pageData.pageContent}
        sermonsCategories={categories}
        sermonsData={sermonsData}
      />
    </>
  );
}
