import { SermonCardProps } from "../SermonCard/types";
import { SermonsCategoriesListProps } from "../SermonFilters/types";

export interface SermonsContentProps {
  contentData?: any
  sermonsData: SermonCardProps[]
  sermonsCategories: SermonsCategoriesListProps
}

export interface SermonsListProps {
  currentSermons: SermonCardProps[]
  searchedSermons: SermonCardProps[] | []
}
