import { Metadata } from "next";
import StaffDataApi from "@/services/StaffDataApi";
import { RoutePath } from "@/constants";
import Container from "@/ui/containers/Container/Container";
import { Text, CustomImage } from "@/ui/components/ui-kit";
import StaffBlogPosts from "@/ui/components/page-specific/staff/StaffBlogPosts/StaffBlogPosts";
import TextToSpeech from "@/ui/components/TextToSpeech/TextToSpeech";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { PostParams } from "@/types/postTypes";
import { getPagePathData } from "@/utils/getPostSeoData";
import { getSeoData } from "@/utils/getSeoData";
import { getTranslations } from "@/utils/languageParser";
import BlogDataApi from "@/services/BlogDataApi";

import styles from "@/styles/pages/staff-person.module.scss";

export async function generateStaticParams() {
  return [];
}

export const revalidate = 10 * 60;

export async function generateMetadata({
  params,
}: {
  params: PostParams;
}): Promise<Metadata> {
  const postData = await StaffDataApi.getMinisterItemDataBySlug(
    params.postSlug,
    params.locale
  );

  if (!postData) {
    return {};
  }

  const seoPathData = getPagePathData({
    locale: params.locale,
    path: `${RoutePath.Staff}/${params.postSlug}`,
  });

  return getSeoData({ seoContentData: postData.seo, seoPathData });
}

export default async function StaffPerson({ params }: { params: PostParams }) {
  const translations = getTranslations(params.locale);
  const postData = await StaffDataApi.getMinisterItemDataBySlug(
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

  const staffPosts = postData?.ministerUserSlug
    ? await BlogDataApi.getPostsDataByLangAndAuthor(
        params.locale,
        postData?.ministerUserSlug
      )
    : null;

  const ministerName =
    postData.ministerFirstName + " " + postData.ministerLastName;

  return (
    <Container>
      <div className={styles["staff-person__header"]}>
        <div className={styles["staff-person__image-container"]}>
          <CustomImage
            imageURL={postData.imageLinks.large}
            className={styles["staff-person__image"]}
            priority={true}
            sizes="30vw"
          />
        </div>
        <div className={styles["staff-person__info"]}>
          <Text textType="h1" className={styles["staff-person__name"]}>
            {ministerName}
          </Text>

          <Text textType="span" className={styles["staff-person__position"]}>
            {postData.ministerPosition}
          </Text>
        </div>

        <TextToSpeech data={postData.ministerDescription} />
      </div>

      {/* <MarkdownContent
        content={postData.ministerDescription}
        className={styles["staff-person__page-content"]}
      /> */}

      <StructuredMarkdownContent
        content={postData.blocks}
        className={styles["staff-person__structured-content"]}
        isFontSizeResizable={false}
      />

      {staffPosts && <StaffBlogPosts data={staffPosts} translations={translations} />}
    </Container>
  );
}
