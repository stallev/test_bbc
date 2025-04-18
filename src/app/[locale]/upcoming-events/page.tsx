import { Metadata } from 'next';

import { RoutePath, PagesIDs } from '@/constants';
import { PAGE_REVALIDATE_TIME_IN_SECONDS } from '@/constants/mock';
import { i18n, Locale } from '@/i18n.config';
import PageContentDataApi from '@/services/PageDataApi';
import UpcomingEventsDataApi from '@/services/UpcomingDataApi';
import styles from '@/styles/pages/upcoming-events.module.scss';
import { PagePathProps } from '@/types/globalTypes';
import UpcomingEventsList from '@/ui/components/page-specific/upcoming-event/UpcomingEventsList/UpcomingEventsList';
import SubscribeForm from '@/ui/components/SubscribeForm/SubscribeForm';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({
    locale: locale,
  }));
}

export const revalidate = PAGE_REVALIDATE_TIME_IN_SECONDS;

export async function generateMetadata({ params: { locale } }: PagePathProps): Promise<Metadata> {
  const pageId =
    locale === i18n.defaultLocale
      ? PagesIDs.UpcomingEventsPage[i18n.defaultLocale]
      : PagesIDs.UpcomingEventsPage.ru;

  const { seo: seoContentData } = await PageContentDataApi.getPageContentData(pageId);
  const seoPathData = getPagePathData({
    locale,
    path: RoutePath.UpcomingEvents,
  });

  return getSeoData({ seoContentData, seoPathData });
}

export default async function UpcomingEventsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const pageId =
    locale === i18n.defaultLocale
      ? PagesIDs.UpcomingEventsPage[i18n.defaultLocale]
      : PagesIDs.UpcomingEventsPage.ru;

  const { title } = await PageContentDataApi.getPageContentData(pageId);
  const upcomingEventsData = await UpcomingEventsDataApi.getUpcomingEvents(locale);

  return (
    <>
      <Container>
        <Text textType="h1" className={styles['upcoming-events__title']}>
          {title}
        </Text>

        <div className={styles['upcoming-events__content']}>
          <UpcomingEventsList data={upcomingEventsData} />

          <SubscribeForm />
        </div>
      </Container>
    </>
  );
}
