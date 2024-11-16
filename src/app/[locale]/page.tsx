import dynamic from "next/dynamic";
import { getTranslations } from "@/utils/languageParser";
import { PagesIDs, RoutePath } from "@/constants";
// import RestApiService from "@/services/RestApi";
import UpcomingEventsDataApi from "@/services/UpcomingDataApi";
import PageContentDataApi from "@/services/PageDataApi";
import Seo from "@/ui/components/Seo/Seo";
import { i18n, Locale } from "@/i18n.config";
import GreetingScreen from "@/ui/components/page-specific/home/GreetingScreen/GreetingScreen";
import PageLayout from "@/ui/containers/PageLayout/PageLayout";
import { getPagePathData } from "@/utils/getPostSeoData";

const UpcomingEventsList = dynamic(() => import('@/ui/components/page-specific/home/UpcomingEventsList/UpcomingEventsList'));
const SubscribeFormDynamic = dynamic(() => import('@/ui/components/SubscribeForm/SubscribeForm'));

export default async function Home({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const translations = getTranslations(locale);
  const pageId = locale == "en" ? PagesIDs.Home.en : PagesIDs.Home.ru;

  // const pageData= await RestApiService.getPageData(pageId);
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEvents(locale);
  const contentData = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.Home
  })

  return (
    <>
      <Seo
        seoValues={contentData.seo}
        seoPathData={seoPathData}
      />
      <GreetingScreen
        header_h1_title={translations.home_title}
        header_descr={translations.home_header_descr}
        header_button_label={translations.home_header_button_label}
      />

      <UpcomingEventsList data={upcomingEventsData} />

      <SubscribeFormDynamic
        title={translations.home_subscription_title}
        description={translations.home_subscription_descr}
      />
    </>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}
