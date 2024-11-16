import { SeoPagePathDataProps } from "@/types/globalTypes"

export interface SeoProps {
  seoValues: SeoContentDataProps
  seoPathData: SeoPagePathDataProps
}

export interface SeoContentDataProps {
  data: {
    metaDesc: string
    metaRobotsNofollow: string
    metaRobotsNoindex: string
    readingTime: number
    schema: Schema
    title: string
    twitterDescription: string
    twitterImage: any
    featuredImageUrl?: string
    slug?: string
    canonicalUrl?: string
    alternateLinksSlugs?: {
      [locale: string]: string;
    };
  }
  isPostType?: boolean,
}

export interface Schema {
  pageType: string[]
}
