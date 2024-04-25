import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { Text } from "@/ui/components/ui-kit";
import { PagesIDs } from "@/constants";

import styles from "../styles/pages/giving.module.scss";

const DynamicDonationForm = dynamic(
  () => import("@/ui/components/page-specific/giving/DonationForm/DonationForm")
);

export default function Giving({ pageData }: any) {
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

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.Giving.en : PagesIDs.Giving.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
