export const SeoBlock = `
  seo {
    metaDesc
    metaRobotsNofollow
    metaRobotsNoindex
    readingTime
    schema {
      pageType
    }
    title
    twitterDescription
    twitterImage {
      altText
      mediaItemUrl
    }
  }
`;

export const GeneralInfoBlock = `
  translations {
    language {
      slug
    }
    slug
  }
  featuredImage {
    node {
      mediaItemUrl
    }
  }
`;

