import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import PrayerRequestForm from "@/ui/components/page-specific/prayer-request/PrayerRequestForm/PrayerRequestForm";
import { Text } from "@/ui/components/ui-kit";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/prayer-request.module.scss";

export default function PrayerRequest({ data }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data} />

      <div className={styles['prayer-request']}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles['prayer-request__title']}
          >
            {data.title}
          </Text>

          <StructuredMarkdownContent
            content={data.pageContent}
            className={styles['prayer-request__page-content']}
          />

          <PrayerRequestForm />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.PrayerRequest.en : PagesIDs.PrayerRequest.ru;

  const data = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
