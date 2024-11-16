import dynamic from 'next/dynamic';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GreetingScreen from "@/ui/components/page-specific/home/GreetingScreen/GreetingScreen";
import RestApiService from "../services/RestApi";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import PageContentDataApi from "@/services/PageDataApi";
import { PagesIDs } from "@/constants";

const UpcomingEventsList = dynamic(() => import('@/ui/components/page-specific/home/UpcomingEventsList/UpcomingEventsList'));
const SubscribeFormDynamic = dynamic(() => import('@/ui/components/SubscribeForm/SubscribeForm'));

export default function Home({ data }: any) {
  const { 
    header_button_label, 
    header_descr, 
    header_h1_title
  } = data.pageData.complex[0];

  const { 
    subscription_title, 
    subscription_descr,
  } = data.pageData.complex[2];
  
  return (
    <PageLayout
      seoData={data.contentData.seo}
    >
      <>
        <GreetingScreen
          header_h1_title={header_h1_title}
          header_descr={header_descr}
          header_button_label={header_button_label}
        />
        
        <UpcomingEventsList data={data.upcomingEventsData} />

        <SubscribeFormDynamic
          title={subscription_title}
          description={subscription_descr}
        />
      </>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: {locale: string}) {
  const pageId = locale == "en" ? PagesIDs.Home.en : PagesIDs.Home.ru;

  const pageData= await RestApiService.getPageData(pageId);
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEvents(locale);
  const contentData = await PageContentDataApi.getPageContentData(pageId);

  return {
    props: {
      data: {
        pageData,
        upcomingEventsData,
        contentData,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 360,
  };
}
