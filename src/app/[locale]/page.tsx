import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { PagesIDs, RoutePath, YouTubePlaylistIDs, YouTubeApiKeys } from '@/constants';
import { MAP_IDs } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import styles from '@/styles/pages/home.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import FixedPageLink from '@/ui/components/FixedPageLink/FixedPageLink';
import GreetingScreen from '@/ui/components/page-specific/home/GreetingScreen/GreetingScreen';
import Loader from '@/ui/components/ui-kit/Loader/Loader';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

const LiveStreamsDynamic = dynamic(
  () => import('@/ui/components/page-specific/home/LiveStreams/LiveStreams')
);

const UpcomingEvents = dynamic(
  () => import('@/ui/components/page-specific/home/UpcomingEvents/UpcomingEvents')
);

const Ministries = dynamic(
  () => import('@/ui/components/page-specific/home/Ministries/Ministries')
);

const Staff = dynamic(() => import('@/ui/components/page-specific/home/Staff/Staff'));

const PastorsBlog = dynamic(
  () => import('@/ui/components/page-specific/home/PastorsBlog/PastorsBlog')
);

const Donation = dynamic(() => import('@/ui/components/Donation/Donation'));

const MapLocation = dynamic(() => import('@/ui/components/MapLocation/MapLocation'));

const SubscribeForm = dynamic(() => import('@/ui/components/SubscribeForm/ClientSubscribeForm'));

const LiveStreamsSection = async ({ locale }: { locale: Locale }) => {
  const YouTubeApiService = (await import('@/services/YouTubeApi')).default;
  const videosData = await YouTubeApiService.getPortionYouTubeStreamsItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  return <LiveStreamsDynamic data={videosData} locale={locale} />;
};

const UpcomingEventsSection = async ({
  locale,
  translations,
}: {
  locale: Locale;
  translations: Record<string, string>;
}) => {
  const UpcomingEventsDataApi = (await import('@/services/UpcomingDataApi')).default;
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEventsReduced(locale);

  return <UpcomingEvents data={upcomingEventsData} translations={translations} />;
};

const StaffSection = async ({
  locale,
  translations,
}: {
  locale: Locale;
  translations: Record<string, string>;
}) => {
  const StaffDataApi = (await import('@/services/StaffDataApi')).default;
  const staffData = await StaffDataApi.getMinisters(locale);

  return <Staff data={staffData} translations={translations} />;
};

const PastorsBlogSection = async ({
  locale,
  translations,
}: {
  locale: Locale;
  translations: Record<string, string>;
}) => {
  const BlogDataApi = (await import('@/services/BlogDataApi')).default;
  const postsData = await BlogDataApi.getLastPostsDataHomePageByLang(locale);

  return <PastorsBlog data={postsData} translations={translations} />;
};

const Container = dynamic(() => import('@/ui/containers/Container/Container'), { ssr: true });

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

  return (
    <div className={styles['home__page-content']}>
      <FixedPageLink link={RoutePath.Giving} iconName="donateIcon" label="Giving" />

      {/* Приоритетная загрузка первого экрана */}
      <GreetingScreen
        events_link_label={translations.upcoming_events_nav_link}
        about_church_link_label={translations.about_church_nav_link_text}
      />

      <Suspense fallback={<Loader />}>
        <LiveStreamsSection locale={locale} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <UpcomingEventsSection locale={locale} translations={translations} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Container>
          <SubscribeForm />
        </Container>
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Ministries translations={translations} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <StaffSection locale={locale} translations={translations} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <PastorsBlogSection locale={locale} translations={translations} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Container>
          <Donation isDonationPage={false} translations={translations} />
        </Container>
      </Suspense>

      <Suspense fallback={<Loader />}>
        <MapLocation mapId={MAP_IDs.homePage} />
      </Suspense>
    </div>
  );
}
