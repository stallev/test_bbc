import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PagesIDs } from "@/constants";
import RestApiService from "@/services/RestApi";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import Container from "@/ui/containers/Container/Container";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { Text } from "@/ui/components/ui-kit";

import styles from "../styles/pages/our-beliefs.module.scss";

export default function OurBeliefs({ data }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{data.titleData}</title>
        <meta
          name="description"
          content={translate("stream_meta_description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/Logofavicon.svg" />
      </Head>
      <Container isMarkdownContent>
          <Text textType="h1" className={styles["our-beliefs__title"]}>
            {data.titleData}
          </Text>

          <MarkdownContent
            content={data.contentData}
            className={styles["our-beliefs__page-content"]}
          />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.OurBeliefs.en : PagesIDs.OurBeliefs.ru;

  const data = await RestApiService.getPageData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
