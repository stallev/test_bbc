import { FullGutenbergBlockList } from "./gutenbergGraphqlFragments";

export const getMarkdownPageContentData = `query getMarkdownPageContentData ($id: ID!, $idType: PageIdType) {
  page(id: $id, idType: $idType) {
    title
    ${FullGutenbergBlockList}
  }
}
`;

export const getMarkdownTimeEventContentData = `query getMarkdownTimeEventContentData ($id: ID!, $idType: TimelineEventIdType) {
  timelineEvent(id: $id, idType: $idType) {
    title
    ${FullGutenbergBlockList}
  }
}
`;
