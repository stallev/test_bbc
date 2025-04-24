import { PostCategoryConvertedListItem } from '@/types/postTypes';

import { BlogCardProps } from '../BlogCard/types';
import { BlogFiltersProps, BlogPostsStateProps } from '../BlogContent/types';

export interface BlogFiltersComponentsProps {
  categoriesData: BlogCategoriesData;
  fullPostsList: BlogCardProps[];
  filters: BlogFiltersProps;
  setFilters: (filters: BlogFiltersProps) => void;
  setPosts: (posts: BlogPostsStateProps) => void;
  posts: BlogPostsStateProps;
}

export interface BlogCategoriesData {
  authorsData: PostCategoryConvertedListItem[] | [];
  yearsData: PostCategoryConvertedListItem[] | [];
  topicsData: PostCategoryConvertedListItem[] | [];
}
