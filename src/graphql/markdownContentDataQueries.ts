import { SeoBlock, GeneralInfoBlock } from './commonGraphqlFragments';

export const getMarkdownPageContentData = `query getMarkdownPageContentData ($slug: ID!) {
  page(id: $slug, idType: URI) {
    title
    slug
    content
    ${GeneralInfoBlock}
  }
}
`;

export const getMarkdownTimeEventContentData = `query getMarkdownTimeEventContentData ($id: ID!, $idType: TimelineEventIdType) {
  timelineEvent(id: $id, idType: $idType) {
    title
    slug
    content
    ${GeneralInfoBlock}
    ${SeoBlock}
  }
}
`;
