import { PostsQueryMaxCount } from "@/constants";
import { FullGutenbergBlockList } from "./gutenbergGraphqlFragments";
import { SeoBlock, FeaturedImageBlock, AuthorInfoBlock } from "./commonGraphqlFragments";

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
        pastorsPostsCategories {
          nodes {
            id
          }
        }
        ${FeaturedImageBlock}
        ${AuthorInfoBlock}
        ${SeoBlock}
      }
    }
  }
}
`;

export const getPastorsPostsByLangAndAuthor = `query getPastorsPostsByLangAndAuthor ($language: LanguageCodeFilterEnum, $authorName: String!) {
  allPastorsPost(
    where: {language: $language, authorName: $authorName, status: PUBLISH, orderby: {field: DATE, order: DESC}}
  ) {
    edges {
      node {
        title
        excerpt
        date
        slug
        pastorsPostsCategories {
          nodes {
            id
          }
        }
        ${FeaturedImageBlock}
        ${AuthorInfoBlock}
        ${SeoBlock}
      }
    }
  }
}
`;

export const getPastorsPostsCategoriesByLang = `query getPastorsPostsCategoriesByLang ($language: LanguageCodeFilterEnum) {
  pastorsPostsCategories(where: {hideEmpty: true, language: $language}) {
    edges {
      node {
        count
        id
        name
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
      translations {
        slug
        language {
          code
        }
      }
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

export const getPastorsPostsSitemapData = `query getPastorsPostsSitemapData {
  allPastorsPost(where: {status: PUBLISH, language: EN}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
        modified
      }
    }
  }
}
`;
