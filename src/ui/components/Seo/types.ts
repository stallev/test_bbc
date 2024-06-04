export interface SeoProps {
  seoValues: SeoContentDataProps
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
  isPostType?: boolean
}

export interface Schema {
  pageType: string[]
}
