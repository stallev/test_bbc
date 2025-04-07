import { SermonsCategoriesListProps } from "../SermonFilters/types";
import { RenderingSermonCardDataType } from "@/types/WPDataTypes/SermonPostsDataTypes";

export interface SermonsContentProps {
  contentData?: any
  sermonsData: RenderingSermonCardDataType[]
  sermonsCategories: SermonsCategoriesListProps
}

export interface SermonsListProps {
  currentSermons: RenderingSermonCardDataType[]
  searchedSermons: RenderingSermonCardDataType[] | []
}
