import { RenderingSermonCardDataType } from '@/types/WPDataTypes/SermonPostsDataTypes';

export interface SermonCardsListProps {
  data: RenderingSermonCardDataType[];
  fetchMoreData: () => void;
  hasMore: boolean;
}
