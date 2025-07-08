import { Metadata } from 'next';

import { RoutePath, PagesSlugs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import SermonsDataApi from '@/services/SermonsDataApi';
import { PagePathProps } from '@/types/globalTypes';
import MediaPageHeader from '@/ui/components/page-specific/media/MediaPageHeader/MediaPageHeader';
import SermonsContent from '@/ui/components/page-specific/sermons/SermonsContent/SermonsContent';
import Container from '@/ui/containers/Container/Container';
import { getPageSeoData } from '@/utils/getPageSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({
    locale: locale,
  }));
}

export const revalidate = 60;

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageSlug =
    locale === i18n.defaultLocale ? PagesSlugs.Sermons[i18n.defaultLocale] : PagesSlugs.Sermons.ru;

  return await getPageSeoData({ pageSlug, locale, pagePath: RoutePath.Sermons });
}

export default async function Sermons(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const translations = getTranslations(locale);

  const pageSlug =
    locale === i18n.defaultLocale ? PagesSlugs.Sermons[i18n.defaultLocale] : PagesSlugs.Sermons.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageSlug);
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
