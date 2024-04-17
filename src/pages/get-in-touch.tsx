import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Seo from "@/ui/components/Seo/Seo";
import ContactUsForm from "@/ui/components/ContactUsForm/ContactUsForm";
import { ContactUsEndpoint } from "@/constants";
import { Text } from "@/ui/components/ui-kit";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/contact-us.module.scss";

export default function ContactUs({ data }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Seo pageData={data} />

      <div className={styles['contact-us']}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles['contact-us__title']}
          >
            {data.title}
          </Text>

          <StructuredMarkdownContent
            content={data.pageContent}
            className={styles["contact-us__page-content"]}
          />

          <ContactUsForm
            API_URL={ContactUsEndpoint.dev}
            isContactWillingFieldExist={true}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Contacts.en : PagesIDs.Contacts.ru;

  const data = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
