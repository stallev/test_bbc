import Head from "next/head";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import Container from "@/ui/containers/Container/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PagesIDs } from "@/constants";
import RestApiService from "../services/RestApi";

import styles from '../styles/pages/gospel.module.scss';

export default function Gospel({ data }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{translate("gospel_title")}</title>
        <meta
          name="description"
          content={translate("stream_meta_description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.gospel}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles.gospel__title}
          >
            {data.titleData}
          </Text>

          <MarkdownContent
            content={data.contentData}
            className={styles["gospel__page-content"]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Gospel.en : PagesIDs.Gospel.ru;

  const data = await RestApiService.getPageData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
