import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RoutePath } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import Container from "@/ui/containers/Container/Container";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import { Text } from "@/ui/components/ui-kit";
import EventPeriod from "@/ui/components/page-specific/upcoming-event/EventPeriod/EventPeriod";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { PostParams } from "@/types/postTypes";

import styles from "../../styles/pages/upcoming-event.module.scss";

export default function UpcomingEvent({ postData }: any) {
  return (
    <PageLayout seoData={postData.seo}>
      <Container isMarkdownContent={true}>
        <Text textType="h1" className={styles["upcoming-event__title"]}>
          {postData.title}
        </Text>

        <EventPeriod
          startTime={postData.upcomingEventStart}
          endTime={postData.upcomingEventEnd}
        />

        <StructuredMarkdownContent
          content={postData.blocks}
          className={styles["upcoming-event__page-content"]}
        />
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale }: {params: PostParams, locale: string}) {

  const postData = await UpcomingEventsDataApi.getUpcomingEventItemDataBySlug(params.postSlug, locale);

  if(!!Object.keys(postData).length) {
    return {
      props: {
        postData,
        path: `/upcoming-events/${postData?.slug}`,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 360,
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: RoutePath.NotFoundPage,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}
