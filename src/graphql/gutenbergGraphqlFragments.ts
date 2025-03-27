export const GutenbergParagraphBlock = `
  ... on CoreParagraphBlock {
    name
    order
    saveContent
  }
`;

export const GutenbergImageBlock = `
  ... on CoreImageBlock {
    name
    order
    mediaItem {
      node {
        mediaItemUrl
        caption
      }
    }
  }
`;

export const GutenbergHeadingBlock = `
  ... on CoreHeadingBlock {
    name
    order
    saveContent
    attributes {
      ... on CoreHeadingBlockAttributes {
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
      }
    }
    name
    order
  }
`;

export const GutenbergQuoteBlock = `
  ... on CorePullquoteBlock {
    name
    order
    originalContent
    innerBlocks {
      saveContent
      dynamicContent
      name
      order
    }
  }
`;

export const GutenbergListBlock = `
  ... on CoreListBlock {
    saveContent
    name
    order
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
    ${GutenbergListBlock}
  }
`;