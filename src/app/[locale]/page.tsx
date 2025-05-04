import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Suspense } from 'react';

import { PagesIDs, RoutePath, YouTubePlaylistIDs, YouTubeApiKeys } from '@/constants';
import { MAP_IDs } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import BlogDataApi from '@/services/BlogDataApi';
import PageContentDataApi from '@/services/PageDataApi';
// import UpcomingEventsDataApi from '@/services/UpcomingDataApi';
import YouTubeApiService from '@/services/YouTubeApi';
import styles from '@/styles/pages/home.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import FixedPageLink from '@/ui/components/FixedPageLink/FixedPageLink';
import GreetingScreen from '@/ui/components/page-specific/home/GreetingScreen/GreetingScreen';
import { Loader } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

const StaffSection = dynamic(() => import('@/ui/components/page-specific/home/Staff/StaffSection'));

const UpcomingEventsSection = dynamic(
  () => import('@/ui/components/page-specific/home/UpcomingEvents/UpcomingEventsSection')
);
const Ministries = dynamic(
  () => import('@/ui/components/page-specific/home/Ministries/Ministries'),
  {
    loading: () => <Loader />,
  }
);
const LiveStreamsDynamic = dynamic(
  () => import('@/ui/components/page-specific/home/LiveStreams/LiveStreams')
);
const PastorsBlog = dynamic(
  () => import('@/ui/components/page-specific/home/PastorsBlog/PastorsBlog')
);
const Donation = dynamic(() => import('@/ui/components/Donation/Donation'));
const MapLocation = dynamic(() => import('@/ui/components/MapLocation/MapLocation'));
const SubscribeForm = dynamic(() => import('@/ui/components/SubscribeForm/ClientSubscribeForm'));

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

  // const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEventsReduced(locale);
  const videosData = await YouTubeApiService.getPortionYouTubeStreamsItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  const postsData = await BlogDataApi.getLastPostsDataHomePageByLang(locale);

  return (
    <div className={styles['home__page-content']}>
      <Head>
        <link
          rel="preload"
          href="https://testwordpressmedia1.s3.amazonaws.com/001assets/hero_section_bg.webp"
          as="image"
          fetchPriority="high"
        />
      </Head>
      <FixedPageLink link={RoutePath.Giving} iconName="donateIcon" label="Giving" />

      <GreetingScreen
        events_link_label={translations.upcoming_events_nav_link}
        about_church_link_label={translations.about_church_nav_link_text}
      />

      <LiveStreamsDynamic data={videosData} locale={locale} />

      <Suspense fallback={<Loader />}>
        <UpcomingEventsSection locale={locale} translations={translations} />
      </Suspense>

      <Container>
        <SubscribeForm />
      </Container>

      <Ministries translations={translations} />

      <Suspense fallback={<Loader />}>
        <StaffSection locale={locale} translations={translations} />
      </Suspense>

      <PastorsBlog data={postsData} translations={translations} />

      <Container>
        <Donation isDonationPage={false} translations={translations} />
      </Container>

      <MapLocation mapId={MAP_IDs.homePage} />
    </div>
  );
}
