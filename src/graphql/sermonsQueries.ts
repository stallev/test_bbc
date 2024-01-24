import { PostsQueryMaxCount } from "@/constants";

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
            name
          }
        }
        sermonsPreachers {
          nodes {
            name
          }
        }
        biblebooks {
          nodes {
            name
          }
        }
      }
    }
  }
}
`;

export const getSermonsCategoriesList = `query getSermonsCategoriesList ($language: LanguageCodeFilterEnum!) {
  biblebooks(where: {hideEmpty: true, language: $language}, first: ${PostsQueryMaxCount}) {
    nodes {
      name
    }
  }
  sermonsPreachers(where: {hideEmpty: true, language: $language}, first: ${PostsQueryMaxCount}) {
    nodes {
      name
    }
  }
  sermonsTopics(where: {hideEmpty: true, language: $language}, first: ${PostsQueryMaxCount}) {
    nodes {
      name
    }
  }
}
`;
