import { Locale } from '@/i18n.config';
import {
  AuthorNodeProps,
  FeaturedImageMediaItemUrlProps,
  SeoPostProps,
  BlogPostProps,
  Translation,
} from '@/types/postTypes';
import { getLocaleFormattedDate } from '@/utils/dateFormatter';

import { convertAuthorData } from './convertAuthorData';
import { convertFeaturedImageData } from './convertFeaturedImageData';

import { parseBlocks } from './htmlParser';
import { stripHtmlTags } from '.';

export interface FullPostFetchedDataProps {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: AuthorNodeProps;
  content: string;
  featuredImage: FeaturedImageMediaItemUrlProps;
  seo: SeoPostProps;
  translations: Translation[];
}

export const convertPostFetchedData = (
  data: FullPostFetchedDataProps,
  locale: Locale
): BlogPostProps => {
  return {
    title: data.title,
    excerpt: stripHtmlTags(data.excerpt),
    date: getLocaleFormattedDate(data.date, locale),
    slug: data.slug,
    featuredImageData: convertFeaturedImageData(data.featuredImage),
    author: convertAuthorData(data.author),
    content: parseBlocks(data.content),
    seo: data.seo,
  };
};
