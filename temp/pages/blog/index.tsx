import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import BlogDataApi from "@/services/BlogDataApi";
import { PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import { PageContentDataType } from "@/types/WPDataTypes/PageContentDataTypes";
import { BlogPageCardsListProps, StandartPageDataType } from "@/types/postTypes";

import styles from '../../styles/pages/pastors-blog.module.scss';

const BlogContent = dynamic(() => import('@/ui/components/page-specific/blog/BlogContent/BlogContent'));

interface BlogPageDataType {
  pageData: PageContentDataType
  postsData: BlogPageCardsListProps
}

export default function PastorsBlog({ pageData, postsData }: BlogPageDataType) {
  const postsCategories = {
    yearsData: postsData.yearsList,
    authorsData: postsData.authorsList
  };

  return (
    <PageLayout seoData={pageData.seo}>
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
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<BlogPageDataType> = async(context: GetStaticPropsContext) => {
  const { PastorsBlog: pageID } = PagesIDs;
  const locale = context.locale || DEFAULT_LOCALE;
  
  const pageId = locale == DEFAULT_LOCALE ? pageID.en : pageID.ru;
  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const postsData = await BlogDataApi.getPostsDataByLang(locale);

  return {
    props: {
      pageData,
      postsData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  } as GetStaticPropsResult<BlogPageDataType>;
}
