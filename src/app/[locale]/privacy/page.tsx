import { Metadata } from 'next';

import { RoutePath, PagesIDs } from '@/constants';
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import styles from '@/styles/pages/privacy.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import StructuredMarkdownContent from '@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';

export async function generateStaticParams() {
  return [];
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata({ params: { locale } }: PagePathProps): Promise<Metadata> {
  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.Privacy[i18n.defaultLocale] : PagesIDs.Privacy.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.PrivacyPolicy,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Privacy({ params: { locale } }: { params: { locale: Locale } }) {
  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.Privacy[i18n.defaultLocale] : PagesIDs.Privacy.ru;

  const { title, pageContent } = await PageContentDataApi.getPageContentData(pageId);

  return (
    <>
      <Container className={styles.privacy__container}>
        <Text textType="h1" className={styles.privacy__title}>
          {title}
        </Text>

        <StructuredMarkdownContent
          content={pageContent}
          className={styles['privacy__page-content']}
          isFontSizeResizable={false}
        />
      </Container>
    </>
  );
}
