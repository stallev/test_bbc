import { BlogCardProps } from "../BlogCard/types";

export interface BlogCardsListProps {
  data: BlogCardProps[]
  fetchMoreData: () => void
  hasMore: boolean
}