import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import { Text } from "@/ui/components/ui-kit";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import { StandartPageDataType } from "@/types/postTypes";

import styles from '../../styles/pages/marriage.module.scss';

export default function Marriage({ pageData }: StandartPageDataType) {
  return (
    <PageLayout seoData={pageData.seo}>
      <div className={styles.marriage}>
        <Container isMarkdownContent={true}>
          <Text
            textType="h1"
            className={styles.marriage__title}
          >
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["marriage__page-content"]}
          />
        </Container>
      </div>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<StandartPageDataType> = async(context: GetStaticPropsContext) => {
  const { Marriage: pageID } = PagesIDs;
  const locale = context.locale || DEFAULT_LOCALE;
  
  const pageId = locale == DEFAULT_LOCALE ? pageID.en : pageID.ru;
  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  } as GetStaticPropsResult<StandartPageDataType>;
}
