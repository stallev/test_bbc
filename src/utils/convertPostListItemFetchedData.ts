import { convertFeaturedImageData } from "./convertFeaturedImageData";
import { FeaturedImageMediaItemUrlProps, AuthorNodeProps, SeoPostProps } from "@/types/postTypes";
import { BlogCardProps } from "@/ui/components/page-specific/blog/BlogCard/types";
import { convertAuthorData } from "./convertAuthorData";
import { getFormattedPostDate } from "./getFormattedPostDate";
import { stripHtmlTags } from ".";
import { getShortMonthFormattedDate } from "@/hooks/useLocaleFormattedDate";
import { NO_IMAGE } from "@/constants/mock";

export interface PostListItemFetchedDataProps {
  title: string
  excerpt: string
  date: string
  slug: string
  featuredImage: FeaturedImageMediaItemUrlProps
  author: AuthorNodeProps
  seo: SeoPostProps
}


export const convertPostListItemFetchedData = (data: PostListItemFetchedDataProps, locale: string): BlogCardProps => {
  return {
    title: data.title,
    excerpt: stripHtmlTags(data.excerpt),
    // date: getShortMonthFormattedDate(data.date, locale),
    date: getFormattedPostDate(data.date, locale),
    slug: data.slug,
    featuredImageData: convertFeaturedImageData(data.featuredImage),
    author: convertAuthorData(data.author),
    readingTime: data.seo.readingTime || 1
  }
}
