import { ParsedHTMLBlock } from '@/types/postTypes';
import { RenderingSermonCardDataType } from '@/types/WPDataTypes/SermonPostsDataTypes';

import { SermonsCategoriesListProps } from '../SermonFilters/types';

export interface SermonsContentProps {
  contentData?: ParsedHTMLBlock[];
  sermonsData: RenderingSermonCardDataType[];
  sermonsCategories: SermonsCategoriesListProps;
}

export interface SermonsListProps {
  currentSermons: RenderingSermonCardDataType[];
  searchedSermons: RenderingSermonCardDataType[] | [];
}
