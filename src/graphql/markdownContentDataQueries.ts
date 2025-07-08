import { SeoBlock, GeneralInfoBlock } from './commonGraphqlFragments';
import { FullGutenbergBlockList } from './gutenbergGraphqlFragments';

export const getMarkdownPageContentData = `query getMarkdownPageContentData ($slug: ID!) {
  page(id: $slug, idType: URI) {
    title
    slug
    ${FullGutenbergBlockList}
    ${GeneralInfoBlock}
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
