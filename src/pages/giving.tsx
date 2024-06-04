import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { Text } from "@/ui/components/ui-kit";
import { PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import { StandartPageDataType } from "@/types/postTypes";

import styles from "../styles/pages/giving.module.scss";

const DynamicDonationForm = dynamic(
  () => import("@/ui/components/page-specific/giving/DonationForm/DonationForm")
);

export default function Giving({ pageData }: StandartPageDataType) {
  return (
    <PageLayout seoData={pageData.seo}>
      <div className={styles.giving}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles.giving__title}>
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            isFontSizeResizable={false}
            className={styles["giving__page-content"]}
          />

          <DynamicDonationForm />
        </Container>
      </div>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<StandartPageDataType> = async(context: GetStaticPropsContext) => {
  const { Giving: pageID } = PagesIDs;
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

