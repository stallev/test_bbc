import type { MetadataRoute } from 'next';
import { DOMAIN_NAME } from '@/constants/EndpointsList';
import UpcomingEventsDataApi from '@/services/UpcomingDataApi';
import { PostSitemapSourceData } from '@/types/WPDataTypes/CommonWPDataTypes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsSlugsData = await UpcomingEventsDataApi.getUpcomingEventsSitemapData();

  const routeEntries = postsSlugsData.map((item: PostSitemapSourceData) => ({
    url: `${DOMAIN_NAME}/upcoming-events/${item.slug}`,
    lastModified: new Date(item.modified).toISOString(),
    priority: 0.8,
  }));

  return [...routeEntries];
}
