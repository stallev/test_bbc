import dynamic from "next/dynamic";
import { Metadata } from 'next'
import { getTranslations } from "@/utils/languageParser";
import { PagesIDs, RoutePath } from "@/constants";
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from "@/constants/mock";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import YouTubeApiService from "@/services/YouTubeApi";
import StaffDataApi from "@/services/StaffDataApi";
import BlogDataApi from "@/services/BlogDataApi";
import { YouTubePlaylistIDs, YouTubeApiKeys } from "@/constants";
import { MAP_IDs } from "@/constants/mock";
import PageContentDataApi from "@/services/PageDataApi";
import { i18n, Locale } from "@/i18n.config";
import GreetingScreen from "@/ui/components/page-specific/home/GreetingScreen/GreetingScreen";
import FixedPageLink from "@/ui/components/FixedPageLink/FixedPageLink";
import Staff from "@/ui/components/page-specific/home/Staff/Staff";
import Container from "@/ui/containers/Container/Container";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";

const UpcomingEvents = dynamic(() => import('@/ui/components/page-specific/home/UpcomingEvents/UpcomingEvents'));
const Ministries = dynamic(() => import('@/ui/components/page-specific/home/Ministries/Ministries'));
const LiveStreamsDynamic = dynamic(() => import('@/ui/components/page-specific/home/LiveStreams/LiveStreams'));
const PastorsBlog = dynamic(() => import('@/ui/components/page-specific/home/PastorsBlog/PastorsBlog'));
const Donation = dynamic(() => import('@/ui/components/Donation/Donation'));
const MapLocation = dynamic(() => import('@/ui/components/MapLocation/MapLocation'));

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale: locale,
  }));
}

export async function generateMetadata(
  { params: { locale } }: PagePathProps
): Promise<Metadata> {
  const pageId = locale == i18n.defaultLocale ? PagesIDs.Home[i18n.defaultLocale] : PagesIDs.Home.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Home
  });

  return getSeoData({seoContentData, seoPathData});
}

export default async function Home({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const translations = getTranslations(locale);
  
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEventsReduced(locale);
  const videosData = await YouTubeApiService.getPortionYouTubeStreamsItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );
  const staffData = await StaffDataApi.getMinisters(locale);
  const postsData = await BlogDataApi.getLastPostsDataHomePageByLang(locale);

  return (
    <>
      <FixedPageLink
        link={RoutePath.Giving}
        iconName="donateIcon"
        label="Giving"
      />
      
      <GreetingScreen
        header_h1_title={translations.home_title}
        events_link_label={translations.upcoming_events_nav_link}
        about_church_link_label={translations.about_church_nav_link_text}
      />

      <LiveStreamsDynamic
        data={videosData}
        locale={locale}
      />

      <UpcomingEvents data={upcomingEventsData} />

      <Ministries translations={translations} />

      <Staff data={staffData} translations={translations} />

      <PastorsBlog data={postsData} translations={translations}/>

      <Container>
        <Donation isDonationPage={false} translations={translations} />
      </Container>

      <MapLocation mapId={MAP_IDs.homePage} />
    </>
  );
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;
