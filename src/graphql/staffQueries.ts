import { PostsQueryMaxCount } from '@/constants';

export const getPastorData = `query getMinisterData ($id: ID!, $language: LanguageCodeEnum!){
pastor(id: $id, idType: SLUG) {
    translation(language: $language) {
      title
      slug
      excerpt
      pastorName
      pastorPosition
      pastorUserSlug
      pastorDepartment
      content
      translations {
        slug
        language {
          code
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

export const getMinisterCardData = `query getMinisterCardData ($id: ID!, $idType: MinisterIdType!, $language: LanguageCodeEnum!) {
  minister(id: $id, idType: $idType) {
    translation(language: $language) {
      ministerFirstName
      ministerLastName
      ministerPosition
      ministerDepartment
      ministerDescription
      slug
      excerpt
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
