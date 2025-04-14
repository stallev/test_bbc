import { Metadata } from 'next';

import { RoutePath } from '@/constants';
import UpcomingEventsDataApi from '@/services/UpcomingDataApi';
import styles from '@/styles/pages/upcoming-event.module.scss';
import { PostParams } from '@/types/postTypes';
import EventPeriod from '@/ui/components/page-specific/upcoming-event/EventPeriod/EventPeriod';
import StructuredMarkdownContent from '@/ui/components/StructuredMarkdownContent/StructuredMarkdownContent';
import { Text, CustomImage } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import { getPagePathData } from '@/utils/getPostSeoData';
import { getSeoData } from '@/utils/getSeoData';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 86400;

export async function generateMetadata(props: { params: Promise<PostParams> }): Promise<Metadata> {
  const params = await props.params;
  const data = await UpcomingEventsDataApi.getUpcomingEventItemDataBySlug(
    params.postSlug,
    params.locale
  );

  if (!data) {
    return {};
  }

  const seoPathData = getPagePathData({
    locale: params.locale,
    path: `${RoutePath.UpcomingEvents}/${params.postSlug}`,
  });

  return getSeoData({ seoContentData: data.seo, seoPathData });
}

export default async function UpcomingEventPage(props: { params: Promise<PostParams> }) {
  const params = await props.params;
  const postData = await UpcomingEventsDataApi.getUpcomingEventItemDataBySlug(
    params.postSlug,
    params.locale
  );

  if (!postData) {
    return (
      <div>
        <meta httpEquiv="refresh" content={`0;url=${RoutePath.NotFoundPage}`} />
      </div>
    );
  }

  return (
    <Container>
      <Text textType="h1" className={styles['upcoming-event__title']}>
        {postData.title}
      </Text>

      <EventPeriod
        startTime={postData.upcomingEventStart}
        endTime={postData.upcomingEventEnd}
        locale={params.locale}
      />

      {postData.featuredImageData.isExist && (
        <CustomImage
          imageURL={postData.featuredImageData.featuredImageUrl}
          alt={postData.title}
          className={styles['upcoming-event__event-image']}
        />
      )}

      <StructuredMarkdownContent
        content={postData.blocks}
        className={styles['upcoming-event__page-content']}
        isFontSizeResizable={false}
      />
    </Container>
  );
}
