import { PostsQueryMaxCount } from "@/constants";
import { SeoBlock } from "./commonGraphqlFragments";

export const getMinisterData = `query getMinisterData ($id: ID!, $idType: MinisterIdType!, $language: LanguageCodeEnum!) {
  minister(id: $id, idType: $idType) {
    translation(language: $language) {
      ${SeoBlock}
      ministerFirstName
      ministerLastName
      ministerPosition
      ministerDepartment
      ministerDescription
      slug
      ministerPhoto {
        size
        url
      }
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

export const getMinistersSlugs = `query getMinistersSlugs {
  ministers(where: {status: PUBLISH}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
      }
    }
  }
}
`;

export const getMinistersPostsSitemapData = `query getMinistersPostsSitemapData {
  ministers(where: {status: PUBLISH, language: EN}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
        modified
      }
    }
  }
}
`;
