import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import TimelineEventDataApi from "@/services/TimelineDataApi";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import Container from "@/ui/containers/Container/Container";
import { PathProps } from "@/types/globalTypes";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";

import styles from "../../styles/pages/timeline-event.module.scss";

export default function TimelineEvent({ content }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta
          name="description"
          content={translate("stream_meta_description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container isMarkdownContent={true}>
        <Text textType="h1" className={styles["timeline-event__title"]}>
          {content.title}
        </Text>

        <StructuredMarkdownContent
          content={content.postContent}
          className={styles["timeline-event__page-content"]}
        />
      </Container>
    </>
  );
}

export async function getStaticProps({ params, locale }: {params: any, locale: string}) {

  const postData = await TimelineEventDataApi.getTimelineEventItemDataBySlug(params.postSlug, locale);
  
  const content = {
    title: postData.title,
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

export async function getStaticPaths({ locales }: any) {
  const paths = await TimelineEventDataApi.getTimelineEventsPaths();

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
