import { PostsQueryMaxCount } from "@/constants";
import { FullGutenbergBlockList } from "./gutenbergGraphqlFragments";
import { SeoBlock, GeneralInfoBlock, FeaturedImageBlock, AuthorInfoBlock } from "./commonGraphqlFragments";

export const getPastorsPostsByLang = `query getPastorsPostsByLang ($language: LanguageCodeFilterEnum) {
  allPastorsPost(
    where: {language: $language, status: PUBLISH, orderby: {field: DATE, order: DESC}}
  ) {
    edges {
      node {
        title
        excerpt
        date
        slug
        ${FeaturedImageBlock}
        ${AuthorInfoBlock}
        ${SeoBlock}
      }
    }
  }
}
`;

export const getPastorsPostData = `query getPastorsPostData ($id: ID!, $idType: PastorsPostIdType, $language: LanguageCodeEnum!) {
  pastorsPost(id: $id, idType: $idType) {
    translation(language: $language) {
      title
      slug
      excerpt
      date
      ${AuthorInfoBlock}
      ${FullGutenbergBlockList}
      ${FeaturedImageBlock}
      ${SeoBlock}
    }
  }
}
`;

export const getAllPastorsPostSlugs = `query getAllPastorsPostSlugs {
  allPastorsPost(where: {status: PUBLISH}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
      }
    }
  }
}
`;
