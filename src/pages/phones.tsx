import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/phones.module.scss";

export default function Phones({ pageData }: any) {
  return (
    <PageLayout seoData={pageData.seo}>
      <div className={styles["phones"]}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles["phones__title"]}>
            {pageData.title}
          </Text>
          
          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["phones__page-content"]}
          />
        </Container>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.PhonesPage.en : PagesIDs.PhonesPage.ru;
  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
