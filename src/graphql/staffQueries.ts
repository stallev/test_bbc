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
      blocks {
        ... on CoreParagraphBlock {
          name
          order
          saveContent
        }
        ... on CoreImageBlock {
          name
          order
          mediaItem {
            node {
              mediaItemUrl
              caption
            }
          }
        }
        ... on CoreHeadingBlock {
          name
          order
          saveContent
          attributes {
            ... on CoreHeadingBlockAttributes {
              level
            }
          }
        }
        ... on CorePullquoteBlock {
          name
          order
          originalContent
          innerBlocks {
            saveContent
            dynamicContent
            name
            order
          }
        }
        ... on CoreListBlock {
          saveContent
          name
          order
        }
        ... on CoreGalleryBlock {
          name
          order
          innerBlocks {
            ... on CoreImageBlock {
              mediaItem {
                node {
                  mediaItemUrl
                  caption
                }
              }
              name
              order
            }
          }
        }
      }
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
