import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import { Text } from "@/ui/components/ui-kit";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/privacy.module.scss";

export default function Privacy({ data }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data} />

      <div className={styles.privacy}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles.privacy__title}>
            {data.title}
          </Text>

          <StructuredMarkdownContent
            content={data.pageContent}
            className={styles["privacy__page-content"]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Privacy.en : PagesIDs.Privacy.ru;

  const data = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
