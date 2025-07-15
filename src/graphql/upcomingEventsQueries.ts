import { PostsQueryMaxCount } from '@/constants';

import { FeaturedImageBlock } from './commonGraphqlFragments';

export const getUpcomingEventData = `query getUpcomingEventData ($id: ID!, $idType: UpcomingIdType!, $language: LanguageCodeEnum!) {
  upcoming(id: $id, idType: $idType) {
    translation(language: $language) {
      ${FeaturedImageBlock}
      upcomingEventShortDescription
      upcomingEventStart
      upcomingEventEnd
      title
      excerpt
      slug
    }
  }
}
`;

export const getUpcomingEventDataBySlug = `query getUpcomingEventDataBySlug ($slug: String!, $language: LanguageCodeEnum!) {
  upcomingBy(slug: $slug) {
    translation(language: $language) {
      ${FeaturedImageBlock}
      upcomingEventStart
      upcomingEventEnd
      title
      slug
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

export const getUpcomingEventsSitemapData = `query getUpcomingEventsSitemapData {
  allUpcoming(where: {status: PUBLISH, language: EN}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
        modified
      }
    }
  }
}
`;
