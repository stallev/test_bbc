import { convertFeaturedImageData } from "./convertFeaturedImageData";
import { convertAuthorData } from "./convertAuthorData";
import { AuthorNodeProps, FeaturedImageMediaItemUrlProps, SeoPostProps, BlogPostProps } from "@/types/postTypes";
import { GutenbergBlockType } from "@/types/WPDataTypes/PageContentDataTypes";
import { stripHtmlTags } from ".";
import { Locale } from "@/i18n.config";
import { getLocaleFormattedDate } from "@/utils/dateFormatter";
import { convertGutenbergBlocksData } from "./convertGutenbergBlocksData";

export interface PostFetchedDataProps {
  title: string
  slug: string
  excerpt: string
  date: string
  author: AuthorNodeProps
  blocks: GutenbergBlockType[]
  featuredImage: FeaturedImageMediaItemUrlProps
  seo: SeoPostProps
}

export const convertPostFetchedData = (data: PostFetchedDataProps, locale: Locale): BlogPostProps => {
  return {
    title: data.title,
    excerpt: stripHtmlTags(data.excerpt),
    date: getLocaleFormattedDate(data.date, locale),
    slug: data.slug,
    featuredImageData: convertFeaturedImageData(data.featuredImage),
    author: convertAuthorData(data.author),
    blocks: convertGutenbergBlocksData(data.blocks),
    seo: data.seo,
  }
}
