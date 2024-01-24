import { PostsQueryMaxCount } from "@/constants";

export const getMinisterData = `query getMinisterData ($id: ID!, $idType: MinisterIdType!, $language: LanguageCodeEnum!) {
  minister(id: $id, idType: $idType) {
    translation(language: $language) {
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
