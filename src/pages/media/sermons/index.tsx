import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@/ui/containers/Container/Container";
import { Text } from "@/ui/components/ui-kit";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import SermonsContent from "@/ui/components/page-specific/sermons/SermonsContent/SermonsContent";
import SermonsDataApi from "@/services/SermonsDataApi";
import { PagesIDs } from "@/constants";
import { DEFAULT_LOCALE } from "@/constants/mock";
import { PageContentDataType } from "@/types/WPDataTypes/PageContentDataTypes";
import { RenderingSermonCardDataType, SermonsCategoriesListTypes } from "@/types/WPDataTypes/SermonPostsDataTypes";

import styles from '../../../styles/pages/sermons.module.scss'

interface SermonsPageDataType {
  data: {
    pageData: PageContentDataType
    sermonsData: RenderingSermonCardDataType[]
    categories: SermonsCategoriesListTypes
  }
}

export default function Sermons({ data }: SermonsPageDataType) {
  return (
    <PageLayout seoData={data.pageData.seo}>
      <Container>
        <Text textType="h1" className={styles["sermons__title"]}>
          {data.pageData.title}
        </Text>
      </Container>

      <SermonsContent
        contentData={data.pageData.pageContent}
        sermonsCategories={data.categories}
        sermonsData={data.sermonsData}
      />
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps<SermonsPageDataType> = async(context: GetStaticPropsContext) => {
  const { Sermons: pageID } = PagesIDs;
  const locale = context.locale || DEFAULT_LOCALE;
  
  const pageId = locale == DEFAULT_LOCALE ? pageID.en : pageID.ru;

  const pageData= await PageContentDataApi.getPageContentData(pageId);
  const sermonsData = await SermonsDataApi.getSermonsList(locale);
  const categories = await SermonsDataApi.getSermonsCategories(locale);

  return {
    props: {
      data: {
        pageData,
        sermonsData,
        categories,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  } as GetStaticPropsResult<SermonsPageDataType>;
}
