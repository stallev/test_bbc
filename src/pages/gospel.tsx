import Head from "next/head";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import GospelSpecific from "@/ui/components/page-specific/gospel/GospelContent/GospelContent";
import Container from "@/ui/containers/Container/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PagesIDs } from "@/constants";
import RestApiService from "../services/RestApi";

export default function Gospel({ data }: any) {
  const translate = useTranslationFunction();

  return (
    <>
      <Head>
        <title>{translate("gospel_title")}</title>
        <meta
          name="description"
          content={translate("stream_meta_description")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <GospelSpecific data={data} />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Gospel.en : PagesIDs.Gospel.ru;

  const data = await RestApiService.getPageData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
