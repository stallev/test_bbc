export interface ImageLinks {
  full: string
  thumbnail: string
  medium: string
  large: string
}

export interface UpcomingEventProps {
  data: {
    upcomingEventStart: string
    upcomingEventEnd: string
    shortDescription: string
    upcomingEventDescription: string
    title: string
    slug: string
    featuredImageUrl: string
  }
  isActive: boolean
}
