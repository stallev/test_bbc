import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import TimelineEventDataApi from "@/services/TimelineDataApi";
import { RoutePath } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Text from "@/ui/components/ui-kit/Text";
import { PostParams } from "@/types/postTypes";

import styles from "../../styles/pages/timeline-event.module.scss";

export default function TimelineEvent({ content }: any) {
  return (
    <PageLayout seoData={content.seoData}>
      <Container isMarkdownContent={true}>
        <Text textType="h1" className={styles["timeline-event__title"]}>
          {content.seoData.data.title}
        </Text>

        <StructuredMarkdownContent
          content={content.postContent}
          className={styles["timeline-event__page-content"]}
        />
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale }: {params: PostParams, locale: string}) {

  const timelineEventData = await TimelineEventDataApi.getTimelineEventItemDataBySlug(params.postSlug, locale);

  if(!!Object.keys(timelineEventData).length) {
    const { postData, seo } = timelineEventData;

    const content = {
      seoData: seo,
      postData,
      postContent: convertGutenbergBlocksData(postData.blocks),
    }
  
    return {
      props: {
        content,
        path: `/timeline/${postData?.slug}`,
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
