import { RenderingSermonCardDataType } from "@/types/WPDataTypes/SermonPostsDataTypes";
import { SermonsListProps } from '../SermonsContent/types';
import { PostCategoryConvertedListItem } from "@/types/postTypes";

export interface SermonsCategoriesListProps {
  biblebooks: PostCategoryConvertedListItem[];
  preachers: PostCategoryConvertedListItem[];
  topics: PostCategoryConvertedListItem[];
}

export interface SermonsFiltersProps {
  biblebooks: string;
  preachers: string;
  topics: string;
  startDate: any;
  endDate: any;
}

export interface SermonsFiltersComponentProps {
  categoriesData: SermonsCategoriesListProps
  fullSermonsList: RenderingSermonCardDataType[]
  filters: SermonsFiltersProps
  setFilters: (filters: SermonsFiltersProps) => void
  setSermons: (sermons: SermonsListProps) => void
  sermons: SermonsListProps
}


