import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import Container from "@/ui/containers/Container/Container";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import { PathProps } from "@/types/globalTypes";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { Text } from "@/ui/components/ui-kit";

import styles from "../../styles/pages/upcoming-event.module.scss";

export default function UpcomingEvent({ postData }: any) {
  return (
    <PageLayout seoData={postData.seo}>
      <Container isMarkdownContent={true}>
        <Text textType="h1" className={styles["upcoming-event__title"]}>
          {postData.title}
        </Text>

        <MarkdownContent
          content={postData.upcomingEventDescription}
          className={styles["upcoming-event__page-content"]}
        />
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale }: {params: any, locale: string}) {

  const postData = await UpcomingEventsDataApi.getUpcomingEventItemDataBySlug(params.postSlug, locale);

  return {
    props: {
      postData,
      path: `/upcoming-events/${postData?.slug}`,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}

export async function getStaticPaths({ locales }: any) {
  const paths = await UpcomingEventsDataApi.getUpcomingEventsPaths();

  return {
    paths: [
      ...paths.flatMap((path: PathProps) => {
        return locales.map((locale: string) => {
          return {
            ...path,
            locale,
          }
        })
      })
    ],
    fallback: "blocking",
  }
}
