export interface MediaGalleryProps {
  data: MediaGalleryItemProps[]
} 

export interface MediaGalleryItemProps {
  src: string
  type: string
  order: number
  caption?: string
}
