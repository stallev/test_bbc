import { MediaGalleryItemProps } from '../MediaGallery/types';

export interface MediaSliderProps {
  data: [MediaGalleryItemProps]
  activeMediaItem: MediaGalleryItemProps
  setActiveMediaItem: (item:MediaGalleryItemProps) => void
}
