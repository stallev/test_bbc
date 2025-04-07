import dynamic from "next/dynamic";
import { Metadata } from 'next'
import { getTranslations } from "@/utils/languageParser";
import { PagesIDs, RoutePath } from "@/constants";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import YouTubeApiService from "@/services/YouTubeApi";
import StaffDataApi from "@/services/StaffDataApi";
import { YouTubePlaylistIDs, YouTubeApiKeys } from "@/constants";
import PageContentDataApi from "@/services/PageDataApi";
import { i18n, Locale } from "@/i18n.config";
import GreetingScreen from "@/ui/components/page-specific/home/GreetingScreen/GreetingScreen";
import Staff from "@/ui/components/page-specific/home/Staff/Staff";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { PagePathProps } from "@/types/globalTypes";

const UpcomingEvents = dynamic(() => import('@/ui/components/page-specific/home/UpcomingEvents/UpcomingEvents'));
const LiveStreamsDynamic = dynamic(() => import('@/ui/components/page-specific/home/LiveStreams/LiveStreams'));

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
  
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEvents(locale);
  const videosData = await YouTubeApiService.getPortionYouTubeStreamsItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );
  const staffData = await StaffDataApi.getMinisters(locale);

  return (
    <>
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

      <Staff data={staffData} translations={translations} />
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}
