import { Metadata } from 'next';

import { RoutePath, PagesSlugs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import styles from '@/styles/pages/privacy.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import StructuredMarkdownContent from '@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPageSeoData } from '@/utils/getPageSeoData';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageSlug =
    locale === i18n.defaultLocale
      ? PagesSlugs.PrivacyPolicy[i18n.defaultLocale]
      : PagesSlugs.PrivacyPolicy.ru;

  return await getPageSeoData({ pageSlug, locale, pagePath: RoutePath.PrivacyPolicy });
}

export default async function Privacy(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const pageSlug =
    locale === i18n.defaultLocale
      ? PagesSlugs.PrivacyPolicy[i18n.defaultLocale]
      : PagesSlugs.PrivacyPolicy.ru;

  const { title, pageContent } = await PageContentDataApi.getPageContentData(pageSlug);

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
