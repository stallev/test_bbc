import { Metadata } from 'next';
// import dynamic from 'next/dynamic';

import { YouTubePlaylistIDs, YouTubeApiKeys, RoutePath, PagesIDs } from '@/constants';
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import YouTubeApiService from '@/services/YouTubeApi';
import { PagePathProps } from '@/types/globalTypes';
import VideoStreamsList from '@/ui/components/page-specific/live-streams/VideoStreamsList/VideoStreamsList';
// import MediaPageHeader from '@/ui/components/page-specific/media/MediaPageHeader/MediaPageHeader';
import Container from '@/ui/containers/Container/Container';
import { getFormattedYoutubeVideosData } from '@/utils/getFormattedYoutubeVideosData';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';
// import { getTranslations } from '@/utils/languageParser';

// const LiveStream = dynamic(
//   () => import('@/ui/components/page-specific/live-streams/LiveStream/LiveStream')
// );

export async function generateStaticParams() {
  return [];
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata({ params: { locale } }: PagePathProps): Promise<Metadata> {
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

export default async function Livestreams({ params: { locale } }: { params: { locale: Locale } }) {
  // const translations = getTranslations(locale);

  const { finishedVideos } = await YouTubeApiService.getAllYouTubePlaylistItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  const streamsData = getFormattedYoutubeVideosData(finishedVideos);

  // const LiveStreamData = {
  //   liveVideos,
  //   upcomingVideos,
  // };

  return (
    <Container>
      {/* <MediaPageHeader isLivestreamPage={true} translations={translations} />

      <LiveStream data={LiveStreamData} /> */}

      <VideoStreamsList data={streamsData} locale={locale} />
    </Container>
  );
}
