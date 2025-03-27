import { convertFeaturedImageData } from "./convertFeaturedImageData";
import { convertAuthorData } from "./convertAuthorData";
import { AuthorNodeProps, FeaturedImageMediaItemUrlProps, authorFinishedContentProps, SeoPostProps, BlockProps, BlogPostProps } from "@/types/postTypes";
import { GutenbergBlockType } from "@/types/WPDataTypes/PageContentDataTypes";
import { stripHtmlTags } from ".";
import { getShortMonthFormattedDate } from "@/hooks/useLocaleFormattedDate";
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

export const convertPostFetchedData = (data: PostFetchedDataProps, locale: string): BlogPostProps => {
  console.log(data.blocks)
  return {
    title: data.title,
    excerpt: stripHtmlTags(data.excerpt),
    date: getShortMonthFormattedDate(data.date, locale),
    slug: data.slug,
    featuredImageData: convertFeaturedImageData(data.featuredImage),
    author: convertAuthorData(data.author),
    blocks: convertGutenbergBlocksData(data.blocks),
    seo: data.seo,
  }
}
