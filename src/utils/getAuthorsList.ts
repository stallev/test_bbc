import { PostCategoryListItem } from "@/types/postTypes";
import { BlogCardProps } from "@/ui/components/page-specific/blog/BlogCard/types";

export const getAuthorsList = (postsList: BlogCardProps[]):PostCategoryListItem[] => {
  const authors: PostCategoryListItem[] = postsList.reduce((acc: PostCategoryListItem[], post) => {
    const existingAuthor = acc.find((author) => author.id === post.author.id);
    
    if (!existingAuthor) {
      acc.push({ id: post.author.id, value: post.author.authorFullName });
    }
    return acc;
  }, []);

  return authors;
}
