import { BlogCardProps } from "../BlogCard/types";
import { PostCategoryConvertedListItem } from "@/types/postTypes";
import { BlogCategoriesData } from "../BlogFilters/types";

export interface BlogContentProps {
  postsData: BlogCardProps[]
  postsCategories: BlogCategoriesData
}

export interface BlogPostsStateProps {
  currentPosts: BlogCardProps[]
  searchedPosts: BlogCardProps[]
}

export interface BlogFiltersProps {
  authors: string
  years: string
  topics: string,
}
