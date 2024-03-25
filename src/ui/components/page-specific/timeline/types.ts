export interface TimelineYearsListProps {
  data: TimelineYearProps[]
}

export interface TimelineYearProps {
  year: string
  eventsList: TimelineEventProps[]
}

export interface TimelineEventProps {
  excerpt: string
  featuredImage: FeaturedImage
  timelineEventDate: string
  slug: string
  title: string
}

export interface FeaturedImage {
  node: Node
}

export interface Node {
  mediaItemUrl: string
}
