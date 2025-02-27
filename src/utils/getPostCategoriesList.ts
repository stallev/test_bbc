import { PostCategoryConvertedListItem, PostCategoryFetchedListItem, PastorsPostCategoryNodeProps } from "@/types/postTypes";

export const getSermonsCategoryList = (postsList: PostCategoryConvertedListItem[]):PostCategoryConvertedListItem[] => {
  const categoryItemsList: PostCategoryConvertedListItem[] = postsList.reduce((acc: PostCategoryConvertedListItem[], item) => {
    const existingCategory = acc.find((category) => category.id === item.id);
    
    if (!existingCategory) {
      acc.push({ id: item.id, value: item.value });
    }
    return acc;
  }, []);

  return categoryItemsList;
}

export const getCategoryConvertedListItem = (items: PostCategoryFetchedListItem[]) => {
  return !!items?.length ? items.map((item: PostCategoryFetchedListItem): PostCategoryConvertedListItem => {
    return {
      id: item.id,
      value: item.name
    }
  }) : [];
}
