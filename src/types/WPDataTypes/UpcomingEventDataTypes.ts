import { SeoContentDataProps } from '../globalTypes';
import { PostFeaturedImageData } from '../postTypes';
export interface FetchedRestUpcomingEventType {
  id: string;
  title: string;
  slug: string;
  upcoming_event_start: string;
  upcoming_event_end: string;
  upcoming_event_short_description: string;
  created_at: string;
  updated_at: string;
}

export interface UpcomingEventDataProps {
  featuredImageData: PostFeaturedImageData;
  seo: SeoContentDataProps;
  title: string;
  slug: string;
  upcomingEventStart: string;
  upcomingEventEnd: string;
}
