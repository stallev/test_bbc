import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import StaffDataApi from "@/services/StaffDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../styles/pages/staff.module.scss'
import StaffList from "@/ui/components/page-specific/staff/StaffList/StaffList";

export default function Staff({ data }: any) {
  return (
    <PageLayout seoData={data.pageData.seo}>
      <Container>
        <Text textType="h1" className={styles["staff__title"]}>
          {data.pageData.title}
        </Text>
      </Container>
      <StaffList data={data.staffData} />
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.Staff.en : PagesIDs.Staff.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);

  return {
    props: {
      data: {
        pageData,
        staffData,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
