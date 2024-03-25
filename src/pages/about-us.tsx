import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/about-us.module.scss";

export default function AboutUs({ pageData }: any) {
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/Logofavicon.svg" />
      </Head>
      <div className={styles["about-us"]}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles["about-us__title"]}>
            {pageData.title}
          </Text>
          
          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["about-us__page-content"]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.AboutUs.en : PagesIDs.AboutUs.ru;
  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
