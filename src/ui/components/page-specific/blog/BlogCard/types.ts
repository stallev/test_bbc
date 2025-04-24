import {
  authorFinishedContentProps,
  FormattedPostDateProps,
  PostFeaturedImageData,
} from '@/types/postTypes';

export interface BlogCardDataProps {
  data: BlogCardProps;
  index?: number;
}

export interface BlogCardProps {
  title: string;
  excerpt: string;
  simpleDate: string;
  date: FormattedPostDateProps;
  slug: string;
  featuredImageData: PostFeaturedImageData;
  author: authorFinishedContentProps;
  topics: string[] | [];
  readingTime: number;
}
