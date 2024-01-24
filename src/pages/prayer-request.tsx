import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import MarkdownContent from "@/ui/components/MarkdownContent/MarkdownContent";
import PrayerRequestForm from "@/ui/components/page-specific/prayer-request/PrayerRequestForm/PrayerRequestForm";
import { Text } from "@/ui/components/ui-kit";
import RestApiService from "../services/RestApi";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/prayer-request.module.scss";

export default function PrayerRequest({ data }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{translate("site_name")}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logofavicon.svg" />
      </Head>
      <div className={styles['prayer-request']}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles['prayer-request__title']}
          >
            {data.titleData}
          </Text>

          <MarkdownContent
            content={data.contentData}
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

  const data = await RestApiService.getPageData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
