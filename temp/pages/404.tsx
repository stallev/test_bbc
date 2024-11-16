import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RoutePath } from "@/constants";
import { LinkTypes } from "@/constants";
import Container from "@/ui/containers/Container/Container";
import CustomLink from "@/ui/components/ui-kit/CustomLink";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import Text from "@/ui/components/ui-kit/Text";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import { StandartPageDataType } from "@/types/postTypes";

import styles from "../styles/pages/not-found.module.scss";

export default function NotFoundPage({ pageData }: StandartPageDataType) {
  const translate = useTranslationFunction();
  
  return (
    <PageLayout seoData={pageData.seo}>
      <div className={styles["not-found"]}>
        <Container isMarkdownContent={true}>
          <Text textType="h1" className={styles["not-found__title"]}>
            {pageData.title}
          </Text>
          
          <StructuredMarkdownContent
            isFontSizeResizable={false}
            content={pageData.pageContent}
            className={styles["not-found__page-content"]}
          />

          <CustomLink
            to={RoutePath.Home}
            label={translate("back_home_nav_link_text")}
            type={LinkTypes.primary}
            className={styles["not-found__back-to-homepage-link"]}
          />
        </Container>
      </div>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<StandartPageDataType> = async(context: GetStaticPropsContext) => {
  const { NotFoundPage: pageID } = PagesIDs;
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
