import { PostCategoryListItem } from "@/types/postTypes";
import { BlogCardProps } from "@/ui/components/page-specific/blog/BlogCard/types";

export const getPostsYearsList = (postsList: BlogCardProps[]): PostCategoryListItem[] => {
  return postsList.reduce((acc: PostCategoryListItem[], post: BlogCardProps) => {
    const existingYear = acc.find((year) => year.id === post.date.year);

    if (!existingYear) {
      acc.push({ id: post.date.year, value: post.date.year });
    }
    return acc;
  }, []);
}
