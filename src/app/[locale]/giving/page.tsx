import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { RoutePath, PagesSlugs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import { PagePathProps } from '@/types/globalTypes';
import Container from '@/ui/containers/Container/Container';
import { getPageSeoData } from '@/utils/getPageSeoData';
import { getTranslations } from '@/utils/languageParser';

const Donation = dynamic(() => import('@/ui/components/Donation/Donation'));

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
    locale === i18n.defaultLocale ? PagesSlugs.Giving[i18n.defaultLocale] : PagesSlugs.Giving.ru;

  return await getPageSeoData({ pageSlug, locale, pagePath: RoutePath.Giving });
}

export default async function Giving(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const translations = getTranslations(locale);

  return (
    <>
      <Container>
        <Donation isDonationPage={true} translations={translations} />
      </Container>
    </>
  );
}
