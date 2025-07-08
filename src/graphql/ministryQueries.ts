import { PostsQueryMaxCount } from '@/constants';
import { FeaturedImageBlock } from './commonGraphqlFragments';
import { FullGutenbergBlockList } from './gutenbergGraphqlFragments';

export const getMinistryData = `query getMinistryData ($postSlug: ID!, $language: LanguageCodeEnum!) {
  ministry(id: $postSlug, idType: SLUG) {
    translation(language: $language) {
      slug
      title
      ${FullGutenbergBlockList}
      ${FeaturedImageBlock}
      excerpt
      ministryDays
      ministryHours
      ministryShortDescription
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      ministryMediaGallery {
        node {
          alt
          caption
          filename
          sizes {
            size
            url
          }
        }
      }
    }
  }
}
`;

export const getMinistriesPostsSitemapData = `query getMinistriesPostsSitemapData {
  ministries(where: {status: PUBLISH, language: EN}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
        modified
      }
    }
  }
}
`;
