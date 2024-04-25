import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import ContactUsForm from "@/ui/components/ContactUsForm/ContactUsForm";
import { WorshipParticipationRequestEndpoint } from "@/constants";
import StructuredMarkdownContent from "@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent";
import Text from "@/ui/components/ui-kit/Text";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { PagesIDs } from "@/constants";

import styles from '../styles/pages/participation.module.scss';


export default function ParticipationInWorship({ pageData }: any) {
  return (
    <PageLayout seoData={pageData.seo}>
      <div className={styles.participation}>
        <Container isMarkdownContent>
          <Text textType="h1" className={styles.participation__title}>
            {pageData.title}
          </Text>

          <StructuredMarkdownContent
            content={pageData.pageContent}
            className={styles["participation__page-content"]}
          />

          <ContactUsForm
            API_URL={WorshipParticipationRequestEndpoint.dev}
            isContactWillingFieldExist={false}
          />
        </Container>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.Participation.en : PagesIDs.Participation.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      pageData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
