import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import StaffDataApi from "@/services/StaffDataApi";
import { PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import { PageContentDataType } from "@/types/WPDataTypes/PageContentDataTypes";
import { StaffPersonCardProps } from "@/ui/components/page-specific/staff/StaffPersonCard/types";

import styles from '../../styles/pages/staff.module.scss'
import StaffList from "@/ui/components/page-specific/staff/StaffList/StaffList";

interface StaffContentDataType {
  staffData: StaffPersonCardProps[]
  pageData: PageContentDataType
}

export default function Staff({ staffData, pageData }: StaffContentDataType) {
  return (
    <PageLayout seoData={pageData.seo}>
      <Container>
        <Text textType="h1" className={styles["staff__title"]}>
          {pageData.title}
        </Text>
      </Container>
      <StaffList data={staffData} />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<StaffContentDataType> = async(context: GetStaticPropsContext) => {
  const { Staff: pageID } = PagesIDs;
  const locale = context.locale || DEFAULT_LOCALE;
  
  const pageId = locale == DEFAULT_LOCALE ? pageID.en : pageID.ru;

  const pageData = await PageContentDataApi.getPageContentData(pageId);
  const staffData = await StaffDataApi.getMinisters(locale);

  return {
    props: {
      pageData,
      staffData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 60 * 7,
  } as GetStaticPropsResult<StaffContentDataType>;
}
