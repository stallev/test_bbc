import { Metadata } from 'next';
import PageContentDataApi from "@/services/PageDataApi";
import YouTubeApiService from '@/services/YouTubeApi';
import { YouTubePlaylistIDs, YouTubeApiKeys } from '@/constants';
import { RoutePath, PagesIDs } from "@/constants";
import { getTranslations } from "@/utils/languageParser";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import Container from '@/ui/containers/Container/Container';
import MediaPageHeader from '@/ui/components/page-specific/media/MediaPageHeader/MediaPageHeader';
import LiveStream from '@/ui/components/page-specific/live-streams/LiveStream/LiveStream';
import VideoStreamsList from '@/ui/components/page-specific/live-streams/VideoStreamsList/VideoStreamsList';
import { PagePathProps } from "@/types/globalTypes";
import { i18n, Locale } from "@/i18n.config";

import { getFormattedYoutubeVideosData } from '@/utils/getFormattedYoutubeVideosData';

export const revalidate = 5 * 60;

export async function generateMetadata(
  { params: { locale } }: PagePathProps
): Promise<Metadata> {
  const pageId = locale == i18n.defaultLocale ? PagesIDs.LiveStreams[i18n.defaultLocale] : PagesIDs.LiveStreams.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.LiveStreams
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Livestreams({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const translations = getTranslations(locale);

  const {
    finishedVideos,
    liveVideos,
    upcomingVideos,
  } = await YouTubeApiService.getAllYouTubePlaylistItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  const streamsData = getFormattedYoutubeVideosData(finishedVideos);

  const LiveStreamData = {
    liveVideos,
    upcomingVideos,
  }

  return (
    <Container>
      <MediaPageHeader isLivestreamPage={true} translations={translations} />

      <LiveStream data={LiveStreamData} />

      <VideoStreamsList data={streamsData} locale={locale} />
    </Container>
  )
}
