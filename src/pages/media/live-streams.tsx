import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import YouTubeApiService from "@/services/YouTubeApi";
import { YouTubePlaylistIDs, YouTubeApiKeys } from "@/constants";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import VideoStreamsList from "@/ui/components/page-specific/live-streams/VideoStreamsList/VideoStreamsList";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import LiveStream from "@/ui/components/page-specific/live-streams/LiveStream/LiveStream";

import styles from "../../styles/pages/live-streams.module.scss";

export default function Home({ data }: any) {
  const {
    finishedVideos,
    liveVideos,
    upcomingVideos,
  } = data;
  
  const LiveStreamData = {
    liveVideos,
    upcomingVideos,
  }
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{translate("stream_meta_title")}</title>
        <meta
          name="description"
          content={translate("stream_meta_description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <Text textType="h1" className={styles["live-streams__title"]}>
          {translate("streams_page_title")}
        </Text>

        <LiveStream data={LiveStreamData} />

        <VideoStreamsList data={finishedVideos} />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const data = await YouTubeApiService.getAllYouTubePlaylistItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.bbc
  );

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 7,
  };
}
