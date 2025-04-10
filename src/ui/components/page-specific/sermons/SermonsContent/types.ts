import { RenderingSermonCardDataType } from '@/types/WPDataTypes/SermonPostsDataTypes';

import { SermonsCategoriesListProps } from '../SermonFilters/types';

export interface SermonsContentProps {
  contentData?: any;
  sermonsData: RenderingSermonCardDataType[];
  sermonsCategories: SermonsCategoriesListProps;
}

export interface SermonsListProps {
  currentSermons: RenderingSermonCardDataType[];
  searchedSermons: RenderingSermonCardDataType[] | [];
}
