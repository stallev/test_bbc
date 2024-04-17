export const FeaturedImageBlock = `
  featuredImage {
    node {
      mediaItemUrl
    }
  }
`;

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
  date
  featuredImage {
    node {
      mediaItemUrl
    }
  }
`;

export const AuthorInfoBlock = `
  author {
    node {
      slug
      id
      firstName
      lastName
      name
      avatar {
        url
      }
      description
    }
  }
`;
