import { SermonCardProps } from "../SermonCard/types";

export interface SermonCardsListProps {
  data: SermonCardProps[]
  fetchMoreData: () => void
  hasMore: boolean
}
