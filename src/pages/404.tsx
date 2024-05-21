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

import styles from "../styles/pages/not-found.module.scss";

export default function NotFoundPage({ pageData }: any) {
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

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.NotFoundPage.en : PagesIDs.NotFoundPage.ru;
  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
