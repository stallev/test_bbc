import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../styles/pages/pastors-blog.module.scss';

export default function PastorsBlog({ pageData }: any) {
  console.log(pageData)
  return (
    <>
      <Head>
        <title>{pageData.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/Logofavicon.svg" />
      </Head>
      <div className={styles["pastors-blog"]}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles["pastors-blog__title"]}
          >
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["pastors-blog__page-content"]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.PastorsBlog.en : PagesIDs.PastorsBlog.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
