import Head from "next/head";
import dynamic from 'next/dynamic';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GreetingScreen from "@/ui/components/page-specific/home/GreetingScreen/GreetingScreen";
import Seo from "@/ui/components/Seo/Seo";
import RestApiService from "../services/RestApi";
import PostsDataApi from "@/services/PostsDataApi";
import PageContentDataApi from "@/services/PageMarkdownContentDataApi";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import { PagesIDs } from "@/constants";
import { SubscribeToEventsEndpoint } from "@/constants/EndpointsList";

const UpcomingEventsList = dynamic(() => import('@/ui/components/page-specific/home/UpcomingEventsList/UpcomingEventsList'));
const SubscribeFormDynamic = dynamic(() => import('@/ui/components/SubscribeForm/SubscribeForm'));

export default function Home({ data }: any) {
  const translate = useTranslationFunction();

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
    <>
      <Head>
        <title>{translate("site_name")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo pageData={data.contentData} />
      
      <>
        <GreetingScreen
          header_h1_title={header_h1_title}
          header_descr={header_descr}
          header_button_label={header_button_label}
        />
        
        <UpcomingEventsList data={data.upcomingEventsData} />

        <SubscribeFormDynamic
          API_URL={SubscribeToEventsEndpoint.dev}
          title={subscription_title}
          description={subscription_descr}
        />
      </>
    </>
  );
}

export async function getStaticProps({ locale }: any) {
  const pageId = locale == "en" ? PagesIDs.Home.en : PagesIDs.Home.ru;

  const pageData= await RestApiService.getPageData(pageId);
  const upcomingEventsData = await PostsDataApi.getUpcomingEvents(locale);
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
