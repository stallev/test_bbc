import { Metadata } from 'next';

import { RoutePath, PagesSlugs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import styles from '@/styles/pages/contact-us.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import ChurchContactsInfo from '@/ui/components/ContactsInfo/ChurchContactsInfo';
import MapLocation from '@/ui/components/MapLocation/MapLocation';
import { Text, Icon } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPageSeoData } from '@/utils/getPageSeoData';

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
    locale === i18n.defaultLocale
      ? PagesSlugs.Contacts[i18n.defaultLocale]
      : PagesSlugs.Contacts.ru;

  return await getPageSeoData({ pageSlug, locale, pagePath: RoutePath.Contacts });
}

export default async function ContactUs(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const pageSlug =
    locale === i18n.defaultLocale
      ? PagesSlugs.Contacts[i18n.defaultLocale]
      : PagesSlugs.Contacts.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageSlug);

  return (
    <>
      <Container>
        <Text textType="h1" className={styles['contact-us__title']}>
          {title}
        </Text>
        <div className={styles['contact-us__content']}>
          <ChurchContactsInfo locale={locale} isPageContentType={true} />

          <Icon iconName="smallLogo" className={styles['contact-us__icon']} />
        </div>
      </Container>
      <MapLocation />
    </>
  );
}
