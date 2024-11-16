import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import BlogDataApi from "@/services/BlogDataApi";
import Container from "@/ui/containers/Container/Container";
import { BlogPostProps, PostParams } from "@/types/postTypes";
import { SeoContentDataProps } from "@/ui/components/Seo/types";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import { Text } from "@/ui/components/ui-kit";
import { RoutePath } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";

import styles from "../../styles/pages/pastors-post.module.scss";

export default function PastorsPost({ postData, seoData }: { postData: BlogPostProps, seoData: SeoContentDataProps }) {
  return (
    <PageLayout seoData={seoData}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container isMarkdownContent={true}>
        <Text
          textType='h1'
          className={styles["pastors-post__title"]}
        >
          {postData.title}
        </Text>

        <div className={styles["pastors-post__meta-info"]}>
          <Text
            textType='span'
            className={styles["pastors-post__author-name"]}
          >
            {postData.author.authorFullName}
          </Text>

          |
          
          <Text
            textType='span'
            className={styles["pastors-post__published-date"]}
          >
            {postData.date}
          </Text>
        </div>

        {
          !!postData.featuredImageData?.isExist && 
            <div className={styles["pastors-post__image-wrap"]}>
              <Image
                src={postData.featuredImageData.featuredImageUrl}
                fill
                priority
                alt={postData.title}
                sizes='50vw'
              />
            </div>
        }

        <StructuredMarkdownContent
          content={postData.blocks}
          className={styles["pastors-post__post-content"]}
        />

      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale }: {params: PostParams, locale: string}) {

  const { postData, seo } = await BlogDataApi.getPastorsPostItemDataBySlug(params.postSlug, locale);

  if(postData) {
    return {
      props: {
        postData,
        seoData: seo,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      // revalidate: 360,
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: RoutePath.NotFoundPage,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}
