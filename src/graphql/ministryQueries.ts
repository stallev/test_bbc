import { SeoBlock, FeaturedImageBlock } from './commonGraphqlFragments';
import { FullGutenbergBlockList } from './gutenbergGraphqlFragments';

export const getMinistryData = `query getMinistryData ($id: ID!, $idType: MinistryIdType!, $language: LanguageCodeEnum!) {
  ministry(id: $id, idType: $idType) {
    translation(language: $language) {
      slug
      title
      ${FullGutenbergBlockList}
      ${SeoBlock}
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
