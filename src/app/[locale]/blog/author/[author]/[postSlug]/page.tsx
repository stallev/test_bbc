import { Metadata } from "next";
import BlogDataApi from "@/services/BlogDataApi";
import { RoutePath } from "@/constants";
import Container from "@/ui/containers/Container/Container";
import { Text, CustomImage } from "@/ui/components/ui-kit";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import RelatedPosts from "@/ui/components/page-specific/blog/RelatedPosts/RelatedPosts";
import BlogPostAuthorDate from "@/ui/components/page-specific/blog/BlogPostAuthorDate/BlogPostAuthorDate";
import { getTranslations } from "@/utils/languageParser";
import { PostParams } from "@/types/postTypes";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";

import styles from "@/styles/pages/pastors-post.module.scss";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: PostParams;
}): Promise<Metadata> {
  const data = await BlogDataApi.getPastorsPostItemDataBySlug(
    params.postSlug,
    params.locale
  );

  if (!data) {
    return {};
  }

  const seoPathData = getPagePathData({
    locale: params.locale,
    path: `${RoutePath.Blog}/${params.postSlug}`,
  });

  return getSeoData({ seoContentData: data.seo, seoPathData });
}

export default async function PastorsPostPage({
  params,
}: {
  params: PostParams;
}) {
  const translations = getTranslations(params.locale);
  const { postData, postsListBySameAuthor } =
    await BlogDataApi.getPastorsPostItemDataBySlug(
      params.postSlug,
      params.locale
    );

  if (!postData) {
    return (
      <div>
        <meta httpEquiv="refresh" content={`0;url=${RoutePath.NotFoundPage}`} />
      </div>
    );
  }

  return (
    <Container>
      <Text textType="h1" className={styles["pastors-post__title"]}>
        {postData?.title}
      </Text>

      <BlogPostAuthorDate
        date={postData.date}
        author={postData.author.authorFullName}
      />

      {postData.featuredImageData.isExist && (
        <CustomImage
          imageURL={postData.featuredImageData.featuredImageUrl}
          alt={postData.title}
          className={styles["pastors-post__post-image"]}
        />
      )}

      <StructuredMarkdownContent
        content={postData.blocks}
        className={styles["pastors-post__page-content"]}
        isFontSizeResizable={false}
      />

      {!!postsListBySameAuthor.length && (
        <RelatedPosts
          posts={postsListBySameAuthor}
          authorData={postData.author}
          translations={translations}
        />
      )}
    </Container>
  );
}
