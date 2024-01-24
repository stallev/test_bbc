import { SermonCardProps } from "../SermonCard/types";
import { SermonsCategoriesListProps } from "../SermonsFilters/types";

export interface SermonsContentProps {
  sermonsData: SermonCardProps[]
  sermonsCategories: SermonsCategoriesListProps
}
