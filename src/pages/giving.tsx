import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import { Text } from "@/ui/components/ui-kit";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/giving.module.scss";

const DynamicDonationForm = dynamic(
  () => import("@/ui/components/page-specific/giving/DonationForm/DonationForm")
);

export default function Giving({ data }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data} />

      <div className={styles.giving}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles.giving__title}>
            {data.title}
          </Text>

          <StructuredMarkdownContent
            content={data.pageContent}
            className={styles["giving__page-content"]}
          />

          <DynamicDonationForm />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Giving.en : PagesIDs.Giving.ru;

  const data = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
