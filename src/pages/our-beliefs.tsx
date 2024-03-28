import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PagesIDs } from "@/constants";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import { Text } from "@/ui/components/ui-kit";

import styles from "../styles/pages/our-beliefs.module.scss";

export default function OurBeliefs({ data }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data} />

      <Container isMarkdownContent>
          <Text textType="h1" className={styles["our-beliefs__title"]}>
            {data.title}
          </Text>

          <StructuredMarkdownContent
            content={data.pageContent}
            className={styles["our-beliefs__page-content"]}
          />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.OurBeliefs.en : PagesIDs.OurBeliefs.ru;

  const data = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60,
  };
}
