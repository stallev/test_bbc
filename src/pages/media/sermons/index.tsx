import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import SermonsContent from "@/ui/components/page-specific/sermons/SermonsContent/SermonsContent";
import RestApiService from "@/services/RestApi";
import SermonsDataApi from "@/services/SermonsDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../../styles/pages/sermons.module.scss'

export default function Sermons({ data }: any) {
  return (
    <>
      <Head>
        <title>{data.pageData.titleData}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/Logofavicon.svg" />
      </Head>
      <Container>
        <Text textType="h1" className={styles["sermons__title"]}>
          {data.pageData.titleData}
        </Text>
      </Container>

      <SermonsContent
        contentData={data.pageData.contentData}
        sermonsCategories={data.categories}
        sermonsData={data.sermonsData}
      />
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Sermons.en : PagesIDs.Sermons.ru;

  const pageData= await RestApiService.getPageData(pageId);
  const sermonsData = await SermonsDataApi.getSermonsList(locale);
  const categories = await SermonsDataApi.getSermonsCategories(locale);

  return {
    props: {
      data: {
        pageData,
        sermonsData,
        categories,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}