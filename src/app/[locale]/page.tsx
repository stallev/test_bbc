import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { PagesIDs, RoutePath, YouTubePlaylistIDs, YouTubeApiKeys } from '@/constants';
import { MAP_IDs } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import YouTubeApiService from '@/services/YouTubeApi';
import styles from '@/styles/pages/home.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import ClientHomeDonation from '@/ui/components/Donation/ClientHomeDonation';
import FixedPageLink from '@/ui/components/FixedPageLink/FixedPageLink';
import LazyLoader from '@/ui/components/LazyLoader/LazyLoader';
import ClientMaplocation from '@/ui/components/MapLocation/ClientMapLocation';
import GreetingScreen from '@/ui/components/page-specific/home/GreetingScreen/GreetingScreen';
import ClientMinistries from '@/ui/components/page-specific/home/Ministries/ClientMinistries';
import ClientPastorsBlog from '@/ui/components/page-specific/home/PastorsBlog/ClientPastorsBlog';
import ClientStaff from '@/ui/components/page-specific/home/Staff/ClientStaff';
import ClientSubscribeForm from '@/ui/components/SubscribeForm/ClientSubscribeForm';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

const ClientUpcomingEvents = dynamic(
  () => import('@/ui/components/page-specific/home/UpcomingEvents/ClientUpcomingEvents')
);

const LiveStreamsDynamic = dynamic(
  () => import('@/ui/components/page-specific/home/LiveStreams/LiveStreams')
);

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageId =
    locale === i18n.defaultLocale ? PagesIDs.Home[i18n.defaultLocale] : PagesIDs.Home.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Home,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Home(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const translations = getTranslations(locale);

  const videosData = await YouTubeApiService.getPortionYouTubeStreamsItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  return (
    <div className={styles['home__page-content']}>
      <FixedPageLink link={RoutePath.Giving} iconName="donateIcon" label="Giving" />

      <GreetingScreen
        events_link_label={translations.upcoming_events_nav_link}
        about_church_link_label={translations.about_church_nav_link_text}
      />

      <LiveStreamsDynamic data={videosData} locale={locale} />

      <LazyLoader>
        <ClientUpcomingEvents locale={locale} translations={translations} />
        <ClientSubscribeForm />
        <ClientMinistries translations={translations} />
        <ClientStaff locale={locale} translations={translations} />
        <ClientPastorsBlog locale={locale} translations={translations} />
        <ClientHomeDonation isDonationPage={false} translations={translations} />
        <ClientMaplocation mapId={MAP_IDs.homePage} />
      </LazyLoader>
    </div>
  );
}
