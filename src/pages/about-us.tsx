import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import RestApiService from "../services/RestApi";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/about-us.module.scss";

export default function AboutUs({ data }: any) {
  console.log(data.contentData);

  return (
    <>
      <Head>
        <title>{data.titleData}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logofavicon.svg" />
      </Head>
      <div className={styles["about-us"]}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles["about-us__title"]}>
            {data.titleData}
          </Text>

          <MarkdownContent
            content={data.contentData}
            className={styles["about-us__page-content"]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.AboutUs.en : PagesIDs.AboutUs.ru;

  const data = await RestApiService.getPageData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
