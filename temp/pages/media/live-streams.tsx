import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import YouTubeApiService from "@/services/YouTubeApi";
import { YouTubePlaylistIDs, YouTubeApiKeys, PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import VideoStreamsList from "@/ui/components/page-specific/live-streams/VideoStreamsList/VideoStreamsList";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import LiveStream from "@/ui/components/page-specific/live-streams/LiveStream/LiveStream";
import { PageContentDataType } from "@/types/WPDataTypes/PageContentDataTypes";
import { YouTubeVideosDataType } from "@/types/YouTubeDataTypes";

import styles from "../../styles/pages/live-streams.module.scss";

interface LiveStreamsPageDataType {
  videosData: YouTubeVideosDataType
  pageData: PageContentDataType
}

export default function LiveStreams({ videosData, pageData }: LiveStreamsPageDataType) {
  const {
    finishedVideos,
    liveVideos,
    upcomingVideos,
  } = videosData;
  
  const LiveStreamData = {
    liveVideos,
    upcomingVideos,
  }

  return (
    <PageLayout seoData={pageData.seo}>
      <Container>
        <Text textType="h1" className={styles["live-streams__title"]}>
          {pageData.title}
        </Text>

        <LiveStream data={LiveStreamData} />

        <VideoStreamsList data={finishedVideos} />
      </Container>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<LiveStreamsPageDataType> = async(context: GetStaticPropsContext) => {
  const { LiveStreams: pageID } = PagesIDs;
  const locale = context.locale || DEFAULT_LOCALE;
  
  const pageId = locale == DEFAULT_LOCALE ? pageID.en : pageID.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const videosData = await YouTubeApiService.getAllYouTubePlaylistItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  return {
    props: {
      pageData,
      videosData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 7,
  } as GetStaticPropsResult<LiveStreamsPageDataType>;
}
