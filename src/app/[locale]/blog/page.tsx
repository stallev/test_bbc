import { Metadata } from "next";
import PageContentDataApi from "@/services/PageDataApi";
import BlogDataApi from "@/services/BlogDataApi";
import { RoutePath, PagesIDs } from "@/constants";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";
import { Text } from "@/ui/components/ui-kit";
import Container from "@/ui/containers/Container/Container";
import BlogContent from "@/ui/components/page-specific/blog/BlogContent/BlogContent";
import { i18n, Locale } from "@/i18n.config";

import styles from "@/styles/pages/pastors-blog.module.scss";

export const revalidate = 5 * 60;

export async function generateMetadata({
  params: { locale },
}: PagePathProps): Promise<Metadata> {
  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.PastorsBlog[i18n.defaultLocale]
      : PagesIDs.PastorsBlog.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(
    pageId
  );
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Blog,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function UpcomingEventsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const pageId =
    locale == i18n.defaultLocale
      ? PagesIDs.PastorsBlog[i18n.defaultLocale]
      : PagesIDs.PastorsBlog.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const postsData = await BlogDataApi.getPostsDataByLang(locale);
  const postsCategories = {
    yearsData: postsData.yearsList,
    authorsData: postsData.authorsList,
    topicsData: postsData.categoriesList,
  };

  return (
    <Container>
      <Text textType="h1" className={styles["pastors-blog__title"]}>
        {title}
      </Text>

      <BlogContent
        postsData={postsData.postsList}
        postsCategories={postsCategories}
      />
    </Container>
  );
}
