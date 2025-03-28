import { Metadata } from 'next';
import PageContentDataApi from "@/services/PageDataApi";
import { RoutePath, PagesIDs } from "@/constants";
import { getTranslations } from "@/utils/languageParser";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";
import { Text, Icon } from "@/ui/components/ui-kit";
import ChurchContactsInfo from '@/ui/components/ContactsInfo/ChurchContactsInfo';
import { MAP_IDs } from "@/constants/mock";
import MapLocation from '@/ui/components/MapLocation/MapLocation';
import Container from "@/ui/containers/Container/Container";
import { i18n, Locale } from "@/i18n.config";

import styles from "@/styles/pages/contact-us.module.scss";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale: locale,
  }));
}

export const revalidate = 10 * 60;

export async function generateMetadata(
  { params: { locale } }: PagePathProps
): Promise<Metadata> {
  const pageId = locale == i18n.defaultLocale ? PagesIDs.Contacts[i18n.defaultLocale] : PagesIDs.Contacts.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Contacts
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function ContactUs({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const translations = getTranslations(locale);

  const pageId = locale == i18n.defaultLocale ? PagesIDs.Contacts[i18n.defaultLocale] : PagesIDs.Contacts.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);

  return (
    <>
      <Container>
        <Text
          textType="h1"
          className={styles["contact-us__title"]}
        >
          {title}
        </Text>
        <div className={styles["contact-us__content"]}>
          <ChurchContactsInfo locale={locale} isPageContentType={true} />

          <Icon iconName='smallLogo' className={styles["contact-us__icon"]} />
        </div>
      </Container>
      <MapLocation mapId={MAP_IDs.homePage} />
    </>
  )
}
