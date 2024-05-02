import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StaffDataApi from "@/services/StaffDataApi";
import Container from "@/ui/containers/Container/Container";
import TextToSpeech from "@/ui/components/TextToSpeech/TextToSpeech";
import { PathProps } from "@/types/globalTypes";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import { CustomImage, Text } from "@/ui/components/ui-kit";

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

export async function getStaticProps({ params, locale }: {params: any, locale: string}) {

  const postData = await StaffDataApi.getMinisterItemDataBySlug(params.postSlug, locale);

  return {
    props: {
      postData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}

export async function getStaticPaths({ locales }: any) {
  const paths = await StaffDataApi.getMinistersPaths();

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
