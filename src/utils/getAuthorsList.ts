import { PostCategoryConvertedListItem } from "@/types/postTypes";
import { BlogCardProps } from "@/ui/components/page-specific/blog/BlogCard/types";

export const getAuthorsList = (postsList: BlogCardProps[]):PostCategoryConvertedListItem[] => {
  const authors: PostCategoryConvertedListItem[] = postsList.reduce((acc: PostCategoryConvertedListItem[], post) => {
    const existingAuthor = acc.find((author) => author.id === post.author.id);
    
    if (!existingAuthor) {
      acc.push({ id: post.author.id, value: post.author.authorFullName });
    }
    return acc;
  }, []);

  return authors;
}
