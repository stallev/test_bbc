export const GutenbergParagraphBlock = `
  ... on CoreParagraphBlock {
    name
    order
    attributes {
      ... on CoreParagraphBlockAttributes {
        content
      }
    }
  }
`;

export const GutenbergImageBlock = `
  ... on CoreImageBlock {
    name
    order
    mediaItem {
      node {
        mediaItemUrl
      }
    }
  }
`;

export const GutenbergHeadingBlock = `
  ... on CoreHeadingBlock {
    name
    order
    attributes {
      ... on CoreHeadingBlockAttributes {
        content
        level
      }
    }
  }
`;

export const GutenbergGalleryBlock = `
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
`;

export const GutenbergAudioBlock = `
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
`;

export const GutenbergFileBlock = `
  ... on CoreFileBlock {
    attributes {
      ... on CoreFileBlockAttributes {
        href
        fileName
        textLinkHref
      }
    }
    name
    order
  }
`;

export const GutenbergVideoBlock = `
  ... on CoreVideoBlock {
    attributes {
      ... on CoreVideoBlockAttributes {
        src
        caption
      }
    }
    name
    order
  }
`;

export const GutenbergQuoteBlock = `
  ... on CoreQuoteBlock {
    attributes {
      ... on CoreQuoteBlockAttributes {
        citation
      }
    }
    name
    order
    innerBlocks {
      originalContent
    }
  }
`;

export const FullGutenbergBlockList = `
  blocks {
    ${GutenbergParagraphBlock}
    ${GutenbergImageBlock}
    ${GutenbergHeadingBlock}
    ${GutenbergGalleryBlock}
    ${GutenbergAudioBlock}
    ${GutenbergFileBlock}
    ${GutenbergVideoBlock}
    ${GutenbergQuoteBlock}
  }
`