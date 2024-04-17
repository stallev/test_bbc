import { useEffect } from "react";
import Head from "next/head";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import BlogDataApi from "@/services/BlogDataApi";
import { Text } from "@/ui/components/ui-kit";
import Container from "@/ui/containers/Container/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PagesIDs } from "@/constants";

import styles from '../styles/pages/gospel.module.scss';

export default function Gospel({ data }: any) {
  useEffect(() => {
    const getBlogData = async() => {
      const data = await BlogDataApi.getPostsDataByLang('en');
      console.log(data)
    }
    getBlogData();
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data} />
      
      <div className={styles.gospel}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles.gospel__title}
          >
            {data.title}
          </Text>

          <StructuredMarkdownContent
            content={data.pageContent}
            className={styles["gospel__page-content"]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Gospel.en : PagesIDs.Gospel.ru;

  const data = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
