import { PostFeaturedImageData } from '../postTypes';
import { ConvertedGutenbergBlockType } from './GutenbergBlocksTypes';
import { SeoContentDataProps } from '../globalTypes';
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
  blocks: ConvertedGutenbergBlockType[];
  featuredImageData: PostFeaturedImageData;
  seo: SeoContentDataProps;
  title: string;
  slug: string;
  upcomingEventStart: string;
  upcomingEventEnd: string;
}
