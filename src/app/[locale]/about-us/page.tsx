import { Metadata } from 'next';

import { RoutePath, PagesIDs } from '@/constants';
import { MAP_IDs } from '@/constants/mock';
import { i18n } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import StaffDataApi from '@/services/StaffDataApi';
import styles from '@/styles/pages/about-us.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import FixedPageLink from '@/ui/components/FixedPageLink/FixedPageLink';
import MapLocation from '@/ui/components/MapLocation/MapLocation';
import Mission from '@/ui/components/page-specific/about/Mission/Mission';
import Timeline from '@/ui/components/page-specific/about/Timeline/Timeline';
import Staff from '@/ui/components/page-specific/home/Staff/Staff';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 86400; // 24h

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.AboutUs[i18n.defaultLocale] : PagesIDs.AboutUs.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.AboutUs,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function AboutUs(props: PagePathProps) {
  const { locale } = await props.params;

  const translations = getTranslations(locale);

  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.AboutUs[i18n.defaultLocale] : PagesIDs.AboutUs.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const {
    about_us_data: { timeline_data },
    mission_data,
  } = await PageContentDataApi.getAboutUsData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);

  return (
    <>
      <FixedPageLink link={RoutePath.Giving} iconName="donateIcon" label="Giving" />

      <Container>
        <Text textType="h1" className={styles['about-us__title']}>
          {title}
        </Text>
      </Container>

      <div className={styles['about-us__page-content']}>
        <Timeline data={timeline_data} />

        <Mission data={mission_data} />

        <Container>
          <Staff data={staffData} translations={translations} />
        </Container>
        <MapLocation mapId={MAP_IDs.homePage} />
      </div>
    </>
  );
}
