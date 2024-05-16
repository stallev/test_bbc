import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { PollingNotifier, JsonStorage } from "youtube-notifs";
import YouTubeApiService from "@/services/YouTubeApi";
import { YouTubePlaylistIDs, YouTubeApiKeys, PagesIDs } from "@/constants";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import VideoStreamsList from "@/ui/components/page-specific/live-streams/VideoStreamsList/VideoStreamsList";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import LiveStream from "@/ui/components/page-specific/live-streams/LiveStream/LiveStream";

import styles from "../../styles/pages/live-streams.module.scss";

export default function Home({ videosData, pageData }: any) {
  // const notifier = new PollingNotifier({
  //   interval: 15,
  //   storage: new JsonStorage("youtube-notifs.json")
  // });

  // notifier.onNewVideos = (videos) => {
  //     for (const video of videos) {
  //         console.log(video);
  //     }
  // }

  // notifier.subscribe("UCefHFgsnLwBAL-w3YgxBCnw");

  // notifier.start();

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

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.LiveStreams.en : PagesIDs.LiveStreams.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const videosData = await YouTubeApiService.getAllYouTubePlaylistItems(
    YouTubePlaylistIDs.generalLiveStreams,
    YouTubeApiKeys.alexander
  );

  return {
    props: {
      videosData,
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 7,
  };
}
