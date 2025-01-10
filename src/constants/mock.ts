export const ALL_TAXONOMY_ITEMS_NAME = 'all';

export const DEFAULT_SERMONS_FILTER_STATE = {
  biblebooks: ALL_TAXONOMY_ITEMS_NAME,
  preachers: ALL_TAXONOMY_ITEMS_NAME,
  topics: ALL_TAXONOMY_ITEMS_NAME,
  startDate: new Date('1990-01-01'),
  endDate: new Date(),
}

export const DEFAULT_BLOG_POSTS_FILTER_STATE = {
  authors: ALL_TAXONOMY_ITEMS_NAME,
  years: ALL_TAXONOMY_ITEMS_NAME,
  topics: ALL_TAXONOMY_ITEMS_NAME,
}

export const CARDS_PORTION = 10;

export const S3_BUCKET_URL = 'https://testwordpressmedia1.s3.amazonaws.com/';
export const NO_IMAGE = `${S3_BUCKET_URL}001assets/no_image_available.jpg`;
export const DEFAULT_FEATURED_IMAGE = `${process.env.NEXT_PUBLIC_SITE_URL}/default-og-image.jpg`;

export const DEFAULT_LOCALE = 'en';

export const BG_IMAGE_URL = 'https://testwordpressmedia1.s3.amazonaws.com/bg-header.jpg';
