import { Metadata } from 'next';

import { PagesSlugs, RoutePath, YouTubePlaylistIDs, YouTubeApiKeys } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
// import BlogDataApi from '@/services/BlogDataApi';
// import StaffDataApi from '@/services/StaffDataApi';
import UpcomingEventsDataApi from '@/services/UpcomingDataApi';
import YouTubeApiService from '@/services/YouTubeApi';
import styles from '@/styles/pages/home.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import Donation from '@/ui/components/Donation/Donation';
import FixedPageLink from '@/ui/components/FixedPageLink/FixedPageLink';
import MapLocation from '@/ui/components/MapLocation/MapLocation';
import GreetingScreen from '@/ui/components/page-specific/home/GreetingScreen/GreetingScreen';
import LiveStreams from '@/ui/components/page-specific/home/LiveStreams/LiveStreams';
import Ministries from '@/ui/components/page-specific/home/Ministries/Ministries';
// import PastorsBlog from '@/ui/components/page-specific/home/PastorsBlog/PastorsBlog';
// import Staff from '@/ui/components/page-specific/home/Staff/Staff';
import UpcomingEvents from '@/ui/components/page-specific/home/UpcomingEvents/UpcomingEvents';
import ClientSubscribeForm from '@/ui/components/SubscribeForm/ClientSubscribeForm';
import Container from '@/ui/containers/Container/Container';
import { getPageSeoData } from '@/utils/getPageSeoData';
import { getTranslations } from '@/utils/languageParser';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageSlug =
    locale === i18n.defaultLocale ? PagesSlugs.Home[i18n.defaultLocale] : PagesSlugs.Home.ru;

  return await getPageSeoData({ pageSlug, locale, pagePath: RoutePath.Home });
}

export default async function Home(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const translations = getTranslations(locale);

  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEventsReduced(locale);
  const videosData = await YouTubeApiService.getPortionYouTubeStreamsItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );
  // const staffData = await StaffDataApi.getMinisters(locale);
  // const postsData = await BlogDataApi.getLastPostsDataHomePageByLang(locale);

  return (
    <div className={styles['home__page-content']}>
      <FixedPageLink link={RoutePath.Giving} iconName="donateIcon" label="Giving" />

      <GreetingScreen
        events_link_label={translations.upcoming_events_nav_link}
        about_church_link_label={translations.about_church_nav_link_text}
      />

      <LiveStreams data={videosData} locale={locale} />

      <UpcomingEvents data={upcomingEventsData} translations={translations} />

      <Container>
        <ClientSubscribeForm />
      </Container>

      <Ministries translations={translations} />

      {/* <Staff data={staffData} translations={translations} /> */}

      {/* <PastorsBlog data={postsData} translations={translations} /> */}

      <Container>
        <Donation isDonationPage={false} translations={translations} />
      </Container>

      <MapLocation />
    </div>
  );
}
