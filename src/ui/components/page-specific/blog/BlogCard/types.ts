import { authorFinishedContentProps, FormattedPostDateProps, PostFeaturedImageData } from "@/types/postTypes";

export interface BlogCardDataProps {
  data: BlogCardProps
  index?: number
}

export interface BlogCardProps {
  title: string
  excerpt: string
  date: FormattedPostDateProps
  slug: string
  featuredImageData: PostFeaturedImageData
  author: authorFinishedContentProps
  readingTime: number
}
