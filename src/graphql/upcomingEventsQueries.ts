import { PostsQueryMaxCount } from "@/constants";
import { SeoBlock } from "./commonGraphqlFragments";

export const getUpcomingEventData = `query getUpcomingEventData ($id: ID!, $idType: UpcomingIdType!, $language: LanguageCodeEnum!) {
  upcoming(id: $id, idType: $idType) {
    translation(language: $language) {
      upcomingEventStart
      upcomingEventEnd
      upcomingEventShortDescription
      upcomingEventDescription
      title
      itemPhoto {
        name
        sourceUrl
      }
      slug
    }
  }
}
`;

export const getUpcomingEventDataBySlug = `query getUpcomingEventDataBySlug ($slug: String!, $language: LanguageCodeEnum!) {
  upcomingBy(slug: $slug) {
    translation(language: $language) {
      ${SeoBlock}
      upcomingEventStart
      upcomingEventEnd
      upcomingEventShortDescription
      upcomingEventDescription
      title
      itemPhoto {
        name
        sourceUrl
      }
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

export const getUpcomingEventsSlugs = `query getUpcomingEventsSlugs {
  allUpcoming(where: {status: PUBLISH}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
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
