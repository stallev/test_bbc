import { SermonCardProps } from "../SermonCard/types";
import { SermonsListProps } from '../SermonsContent/types';

export interface SermonsCategoriesListProps {
  biblebooks: string[];
  preachers: string[];
  topics: string[];
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
  fullSermonsList: SermonCardProps[]
  filters: SermonsFiltersProps
  setFilters: (filters: SermonsFiltersProps) => void
  setSermons: (sermons: SermonsListProps) => void
  sermons: SermonsListProps
}


