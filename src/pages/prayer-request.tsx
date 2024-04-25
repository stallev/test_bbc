import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import PrayerRequestForm from "@/ui/components/page-specific/prayer-request/PrayerRequestForm/PrayerRequestForm";
import { Text } from "@/ui/components/ui-kit";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/prayer-request.module.scss";

export default function PrayerRequest({ pageData }: any) {
  return (
    <PageLayout seoData={pageData.seo}>
      <div className={styles['prayer-request']}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles['prayer-request__title']}
          >
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            isFontSizeResizable={false}
            className={styles['prayer-request__page-content']}
          />

          <PrayerRequestForm />
        </Container>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.PrayerRequest.en : PagesIDs.PrayerRequest.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
