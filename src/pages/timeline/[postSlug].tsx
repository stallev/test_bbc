import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import TimelineEventDataApi from "@/services/TimelineDataApi";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import Container from "@/ui/containers/Container/Container";
import { PathProps } from "@/types/globalTypes";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";

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

export async function getStaticProps({ params, locale }: {params: any, locale: string}) {

  const { postData, seo } = await TimelineEventDataApi.getTimelineEventItemDataBySlug(params.postSlug, locale);
  
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}
