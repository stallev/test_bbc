import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import SermonsContent from "@/ui/components/page-specific/sermons/SermonsContent/SermonsContent";
import SermonsDataApi from "@/services/SermonsDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../../styles/pages/sermons.module.scss'

export default function Sermons({ data }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data.pageData} />

      <Container>
        <Text textType="h1" className={styles["sermons__title"]}>
          {data.pageData.title}
        </Text>
      </Container>

      <SermonsContent
        contentData={data.pageData.pageContent}
        sermonsCategories={data.categories}
        sermonsData={data.sermonsData}
      />
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Sermons.en : PagesIDs.Sermons.ru;

  const pageData= await PageContentDataApi.getPageContentData(pageId);
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
