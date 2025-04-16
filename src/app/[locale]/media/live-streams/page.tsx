import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { YouTubePlaylistIDs, YouTubeApiKeys, RoutePath, PagesIDs } from '@/constants';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import YouTubeApiService from '@/services/YouTubeApi';
import { PagePathProps } from '@/types/globalTypes';
import LiveStream from '@/ui/components/page-specific/live-streams/LiveStream/LiveStream';
import MediaPageHeader from '@/ui/components/page-specific/media/MediaPageHeader/MediaPageHeader';
import Container from '@/ui/containers/Container/Container';
import { getFormattedYoutubeVideosData } from '@/utils/getFormattedYoutubeVideosData';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
import { getTranslations } from '@/utils/languageParser';

const VideoStreamsList = dynamic(
  () => import('@/ui/components/page-specific/live-streams/VideoStreamsList/VideoStreamsList')
);

export async function generateStaticParams() {
  return [];
}

export const revalidate = 86400; // 24h

export async function generateMetadata(props: PagePathProps): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const pageId =
    locale === i18n.defaultLocale
      ? PagesIDs.LiveStreams[i18n.defaultLocale]
      : PagesIDs.LiveStreams.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.LiveStreams,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function Livestreams(props: { params: Promise<{ locale: Locale }> }) {
  const params = await props.params;

  const { locale } = params;

  const translations = getTranslations(locale);

  const { finishedVideos, liveVideos, upcomingVideos } =
    await YouTubeApiService.getAllYouTubePlaylistItems(
      YouTubePlaylistIDs.generalLiveStreams,
      YouTubeApiKeys.alexander
    );

  const streamsData = getFormattedYoutubeVideosData(finishedVideos);

  const LiveStreamData = {
    liveVideos,
    upcomingVideos,
  };

  return (
    <Container>
      <MediaPageHeader isLivestreamPage={true} translations={translations} />

      <LiveStream data={LiveStreamData} />

      <VideoStreamsList data={streamsData} locale={locale} />
    </Container>
  );
}
