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
    upcomingEventShortDescription: string
    upcomingEventDescription: string
    title: string
    slug: string
    imageLinks: ImageLinks
  }
  isActive: boolean
}
