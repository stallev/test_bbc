import { Metadata } from "next";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import { RoutePath } from "@/constants";
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from "@/constants/mock";
import Container from "@/ui/containers/Container/Container";
import { Text, CustomImage } from "@/ui/components/ui-kit";
import EventPeriod from "@/ui/components/page-specific/upcoming-event/EventPeriod/EventPeriod";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { PostParams } from "@/types/postTypes";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";

import styles from "@/styles/pages/upcoming-event.module.scss";

export async function generateStaticParams() {
  return [];
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata({
  params,
}: {
  params: PostParams;
}): Promise<Metadata> {
  const data = await UpcomingEventsDataApi.getUpcomingEventItemDataBySlug(
    params.postSlug,
    params.locale
  );

  if (!data) {
    return {};
  }

  const seoPathData = getPagePathData({
    locale: params.locale,
    path: `${RoutePath.UpcomingEvents}/${params.postSlug}`,
  });

  return getSeoData({ seoContentData: data.seo, seoPathData });
}

export default async function UpcomingEventPage({
  params,
}: {
  params: PostParams;
}) {
  const postData = await UpcomingEventsDataApi.getUpcomingEventItemDataBySlug(
    params.postSlug,
    params.locale
  );

  if (!postData) {
    return (
      <div>
        <meta httpEquiv="refresh" content={`0;url=${RoutePath.NotFoundPage}`} />
      </div>
    );
  }

  return (
    <Container>
      <Text textType="h1" className={styles["upcoming-event__title"]}>
        {postData.title}
      </Text>

      <EventPeriod
        startTime={postData.upcomingEventStart}
        endTime={postData.upcomingEventEnd}
        locale={params.locale}
      />

      {postData.featuredImageData.isExist && (
        <CustomImage
          imageURL={postData.featuredImageData.featuredImageUrl}
          alt={postData.title}
          className={styles["upcoming-event__event-image"]}
        />
      )}

      <StructuredMarkdownContent
        content={postData.blocks}
        className={styles["upcoming-event__page-content"]}
        isFontSizeResizable={false}
      />
    </Container>
  );
}
