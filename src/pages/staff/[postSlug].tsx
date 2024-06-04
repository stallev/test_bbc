import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RoutePath } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import StaffDataApi from "@/services/StaffDataApi";
import Container from "@/ui/containers/Container/Container";
import TextToSpeech from "@/ui/components/TextToSpeech/TextToSpeech";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { CustomImage, Text } from "@/ui/components/ui-kit";
import { PostParams } from "@/types/postTypes";

import styles from "../../styles/pages/staff-person.module.scss";

export default function StaffPerson({ postData }: any) {
  const ministerName = postData.ministerFirstName + ' ' + postData.ministerLastName;

  return (
    <PageLayout seoData={postData.seo}>
      <Container isMarkdownContent={true}>
        <div className={styles["staff-person__header"]}>
          <CustomImage
            imageURL={postData.imageLinks.large}
            className={styles["staff-person__image"]}
            priority={true}
          />
          <div className={styles["staff-person__info"]}>
            <Text
              textType='h1'
              className={styles["staff-person__name"]}
            >
              {ministerName}
            </Text>

            <Text
              textType='span'
              className={styles["staff-person__position"]}
            >
              {postData.ministerPosition}
            </Text>
          </div>
        </div>

        <TextToSpeech data={postData.ministerDescription} />

        <MarkdownContent
          content={postData.ministerDescription}
          className={styles["staff-person__page-content"]}
        />
      </Container>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale }: {params: PostParams, locale: string}) {
  const postData = await StaffDataApi.getMinisterItemDataBySlug(params.postSlug, locale);

  if(!!Object.keys(postData).length) {
    return {
      props: {
        postData,
        ...(await serverSideTranslations(locale, ["common"])),
      },
      revalidate: 360,
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
