import { Metadata } from 'next';

import { RoutePath, PagesIDs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import BlogDataApi from '@/services/BlogDataApi';
import PageContentDataApi from '@/services/PageDataApi';
import styles from '@/styles/pages/pastors-blog.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import BlogContent from '@/ui/components/page-specific/blog/BlogContent/BlogContent';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';

export const revalidate = 86400;

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({
    locale: locale,
  }));
}

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageId =
    locale === i18n.defaultLocale
      ? PagesIDs.PastorsBlog[i18n.defaultLocale]
      : PagesIDs.PastorsBlog.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Blog,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function UpcomingEventsPage(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const pageId =
    locale === i18n.defaultLocale
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
      <Text textType="h1" className={styles['pastors-blog__title']}>
        {title}
      </Text>

      <BlogContent postsData={postsData.postsList} postsCategories={postsCategories} />
    </Container>
  );
}
