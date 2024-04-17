import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import BlogDataApi from "@/services/BlogDataApi";
import Container from "@/ui/containers/Container/Container";
import { PathProps } from "@/types/globalTypes";
import { BlogPostProps } from "@/types/postTypes";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import { Text } from "@/ui/components/ui-kit";

import styles from "../../styles/pages/pastors-post.module.scss";


export default function PastorsPost({ postData }: { postData: BlogPostProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={postData} />

      <Container isMarkdownContent={true}>
        <Text
          textType='h2'
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
    </>
  );
}

export async function getStaticProps({ params, locale }: {params: any, locale: string}) {

  const postData = await BlogDataApi.getPastorsPostItemDataBySlug(params.postSlug, locale);

  return {
    props: {
      postData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}

export async function getStaticPaths({ locales }: any) {
  const paths = await BlogDataApi.getAllPastorsPostsPaths();

  return {
    paths: [
      ...paths.flatMap((path: PathProps) => {
        return locales.map((locale: string) => {
          return {
            ...path,
            locale,
          }
        })
      })
    ],
    fallback: "blocking",
  }
}
