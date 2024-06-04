export interface WPPostSeoType {
  metaDesc: string
  metaRobotsNofollow: string
  metaRobotsNoindex: string
  readingTime: number
  schema: Schema
  title: string
}

export interface Schema {
  pageType: string[]
}

export interface PostNodeSlugType {
  slug: string
}

export interface PostSitemapSourceData {
  slug: string
  modified: string
}
