import { SermonCardProps } from "../SermonCard/types";
import { SermonsCategoriesListProps } from "../SermonFilters/types";

export interface SermonsContentProps {
  sermonsData: SermonCardProps[]
  sermonsCategories: SermonsCategoriesListProps
}

export interface SermonsListProps {
  currentSermons: SermonCardProps[]
  searchedSermons: SermonCardProps[] | []
}
