import { PostsQueryMaxCount } from "@/constants";
import { FullGutenbergBlockList } from "./gutenbergGraphqlFragments";

export const getTimelineEventData = `query getTimelineEventData ($id: ID!, $idType: TimelineEventIdType!, $language: LanguageCodeEnum!) {
  timelineEvent(id: $id, idType: $idType) {
    translation(language: $language) {
      excerpt
      timelineEventDate
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      slug
      title
    }
  }
}
`;

export const getTimelineEventDataBySlug = `query getTimelineEventDataBySlug ($slug: String!, $language: LanguageCodeEnum!) {
  timelineEventBy(slug: $slug) {
    translation(language: $language) {
      title
      timelineEventDate
      ${FullGutenbergBlockList}
      slug
    }
  }
}
`;

export const getTimelineEventsSlugs = `query getTimelineEventsSlugs {
  allTimelineEvent(where: {status: PUBLISH}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        slug
      }
    }
  }
}
`;
