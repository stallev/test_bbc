import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { Text } from "@/ui/components/ui-kit";
import Container from "@/ui/containers/Container/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PagesIDs } from "@/constants";

import styles from '../styles/pages/gospel.module.scss';

export default function Gospel({ pageData }: any) {
  return (
    <PageLayout seoData={pageData.seo}>      
      <div className={styles.gospel}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles.gospel__title}
          >
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["gospel__page-content"]}
          />
        </Container>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.Gospel.en : PagesIDs.Gospel.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  
  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
