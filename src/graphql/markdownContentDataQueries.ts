import { FullGutenbergBlockList } from "./gutenbergGraphqlFragments";
import { SeoBlock, GeneralInfoBlock } from "./commonGraphqlFragments";

export const getMarkdownPageContentData = `query getMarkdownPageContentData ($id: ID!, $idType: PageIdType) {
  page(id: $id, idType: $idType) {
    title
    slug
    ${FullGutenbergBlockList}
    ${GeneralInfoBlock}
    ${SeoBlock}
  }
}
`;

export const getMarkdownTimeEventContentData = `query getMarkdownTimeEventContentData ($id: ID!, $idType: TimelineEventIdType) {
  timelineEvent(id: $id, idType: $idType) {
    title
    slug
    ${FullGutenbergBlockList}
    ${GeneralInfoBlock}
    ${SeoBlock}
  }
}
`;
