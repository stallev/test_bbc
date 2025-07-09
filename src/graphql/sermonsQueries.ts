import { PostsQueryMaxCount } from '@/constants';

export const getSermonsList = `query getSermonsList ($language: LanguageCodeFilterEnum!) {
  sermons(where: {language: $language, status: PUBLISH}, first: ${PostsQueryMaxCount}) {
    edges {
      node {
        title
        sermonShortDescription
        sermonDate
        sermonAudio
        sermonYoutubeLink
        sermonBookChapter
        sermonBookChapterTextNumber
        sermonPhoto {
          name
          sourceUrl
        }
        sermonsTopics {
          nodes {
            id
            name
          }
        }
        sermonsPreachers {
          nodes {
            id
            name
          }
        }
        biblebooks {
          nodes {
            id
            name
          }
        }
      }
    }
  }
}
`;

export const getSermonsCategoriesList = `query getSermonsCategoriesList ($language: LanguageCodeFilterEnum!) {
  biblebooks(where: {
    hideEmpty: true,
    language: $language
  }, first: ${PostsQueryMaxCount}) {
    nodes {
      id
      name
    }
  }
  sermonsPreachers(where: {
    language: $language
  }, first: ${PostsQueryMaxCount}) {
    nodes {
      id
      name
    }
  }
  sermonsTopics(where: {hideEmpty: true, language: $language}, first: ${PostsQueryMaxCount}) {
    nodes {
      id
      name
    }
  }
}
`;

// string 42 hideEmpty: true - hide biblebooks without sermons
