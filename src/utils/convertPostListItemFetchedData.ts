import { FeaturedImageMediaItemUrlProps, AuthorNodeProps, SeoPostProps } from '@/types/postTypes';
import { BlogCardProps } from '@/ui/components/page-specific/blog/BlogCard/types';

import { convertAuthorData } from './convertAuthorData';
import { convertFeaturedImageData } from './convertFeaturedImageData';
import { getFormattedPostDate } from './getFormattedPostDate';

import { stripHtmlTags } from '.';

export interface PostListItemFetchedDataProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage: FeaturedImageMediaItemUrlProps;
  author: AuthorNodeProps;
  seo: SeoPostProps;
  pastorsPostsCategories: any;
}

interface PastorsPostCategoryNodeProps {
  nodes: PostTopicNodeProps[];
}

interface PostTopicNodeProps {
  id: string;
}

const getPostTopics = (categories: PastorsPostCategoryNodeProps) => {
  return categories.nodes.map((item: PostTopicNodeProps) => item.id);
};

export const convertPostListItemFetchedData = (
  data: PostListItemFetchedDataProps,
  locale: string
): BlogCardProps => {
  return {
    title: data.title,
    excerpt: stripHtmlTags(data.excerpt),
    simpleDate: data.date,
    date: getFormattedPostDate(data.date, locale),
    slug: data.slug,
    featuredImageData: convertFeaturedImageData(data.featuredImage),
    author: convertAuthorData(data.author),
    // topics: [],
    topics: getPostTopics(data.pastorsPostsCategories),
    readingTime: data.seo.readingTime || 1,
  };
};
