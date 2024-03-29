import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import Seo from "@/ui/components/Seo/Seo";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import StaffDataApi from "@/services/StaffDataApi";
import { PagesIDs } from "@/constants";

import styles from '../../styles/pages/staff.module.scss'
import StaffList from "@/ui/components/page-specific/staff/StaffList/StaffList";

export default function Staff({ data }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data.pageData} />

      <Container>
        <Text textType="h1" className={styles["staff__title"]}>
          {data.pageData.title}
        </Text>
      </Container>
      <StaffList data={data.staffData} />
    </>
  );
}

export async function getStaticProps({ locale }: any) {
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
