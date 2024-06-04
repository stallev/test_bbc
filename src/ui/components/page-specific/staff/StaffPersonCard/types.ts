interface ImageLinks {
  full: string
  thumbnail: string
  medium: string
  large: string
}

export interface StaffPersonCardProps {
  data: {
    ministerFirstName: string
    ministerLastName: string
    ministerPosition: string
    ministerDepartment: string
    ministerDescription: string
    slug: string
    imageLinks: ImageLinks
  }
  index?: number
}
