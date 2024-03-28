import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import Seo from "@/ui/components/Seo/Seo";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Text from "@/ui/components/ui-kit/Text";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import TimelineEventDataApi from "@/services/TimelineDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../styles/pages/timeline.module.scss';

const TimelineYearsList = dynamic(
  () => import("@/ui/components/page-specific/timeline/TimelineYearsList/TimelineYearsList")
);

export default function Timeline({ pageData, timelineData }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={pageData} />
      
      <div className={styles.timeline}>
        <Container isMarkdownContent className={styles.timeline__container}>
          <Text textType="h1" className={styles.timeline__title}>
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["timeline__page-content"]}
          />

          <TimelineYearsList data={timelineData} />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Timeline.en : PagesIDs.Timeline.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const timelineData = await TimelineEventDataApi.getTimelineEvents(locale);

  return {
    props: {
      pageData,
      timelineData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
