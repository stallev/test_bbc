import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PostsDataApi from "@/services/PostsDataApi";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import Container from "@/ui/containers/Container/Container";
import { PathProps } from "@/types/globalTypes";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { Text } from "@/ui/components/ui-kit";

import styles from "../../styles/pages/upcoming-event.module.scss";

export default function UpcomingEvent({ postData }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta
          name="description"
          content={translate("stream_meta_description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container isMarkdownContent={true}>
        <Text textType="h1" className={styles["upcoming-event__title"]}>
          {postData.title}
        </Text>

        <MarkdownContent
          content={postData.upcomingEventDescription}
          className={styles["upcoming-event__page-content"]}
        />
      </Container>
    </>
  );
}

export async function getStaticProps({ params, locale }: {params: any, locale: string}) {

  const postData = await PostsDataApi.getUpcomingEventItemDataBySlug(params.postSlug, locale);

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
  const paths = await PostsDataApi.getUpcomingEventsPaths();

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
