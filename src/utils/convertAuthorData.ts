import { AuthorNodeProps, authorFinishedContentProps } from "@/types/postTypes";

export const convertAuthorData = (authorData: AuthorNodeProps): authorFinishedContentProps => {
  const authorFullName = `${authorData.node?.firstName} ${authorData.node?.lastName}`;

  return {
    id: authorData.node.id,
    authorFullName,
    slug: authorData.node.slug,
    avatarUrl: authorData.node.avatar.url,
    description: authorData.node.description,
  }
};
