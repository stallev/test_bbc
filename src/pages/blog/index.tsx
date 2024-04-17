import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import { Text } from "@/ui/components/ui-kit";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import BlogDataApi from "@/services/BlogDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../styles/pages/pastors-blog.module.scss';

const BlogContent = dynamic(() => import('@/ui/components/page-specific/blog/BlogContent/BlogContent'));

export default function PastorsBlog({ pageData, postsData }: any) {
  const postsCategories = {
    yearsData: postsData.yearsList,
    authorsData: postsData.authorsList
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={pageData} />

      <div className={styles["pastors-blog"]}>
        <Container>
          <Text
            textType="h1"
            className={styles["pastors-blog__title"]}
          >
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["pastors-blog__page-content"]}
            isFontSizeResizable={false}
          />

          <BlogContent
            postsData={postsData.postsList}
            postsCategories={postsCategories}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.PastorsBlog.en : PagesIDs.PastorsBlog.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const postsData = await BlogDataApi.getPostsDataByLang(locale);

  return {
    props: {
      pageData,
      postsData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
