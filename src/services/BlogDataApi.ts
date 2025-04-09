import { POST_CARD_HOME_PAGE_COUNT } from '@/constants/mock';
import {
  getPastorsPostData,
  getPastorsPostsByLang,
  getAllPastorsPostSlugs,
  getPastorsPostsSitemapData,
  getPastorsPostsCategoriesByLang,
  getPastorsPostsByLangAndAuthor,
} from '@/graphql/blogQueries';
import { Locale } from '@/i18n.config';
import { PastorsPostCategoryNodeProps } from '@/types/postTypes';
import { PostNodeSlugType, PostSitemapSourceData } from '@/types/WPDataTypes/CommonWPDataTypes';
import { convertPostFetchedData } from '@/utils/convertPostFetchedData';
import { convertPostListItemFetchedData } from '@/utils/convertPostListItemFetchedData';
import { getAuthorsList } from '@/utils/getAuthorsList';
import { getPostSeoData } from '@/utils/getPostSeoData';
import { getPostsYearsList } from '@/utils/getPostsYearsList';

import { fetchAPI } from './WordPressFetchAPI';

class BlogDataApi {
  static async getPostsDataByLang(locale: Locale) {
    const variables = {
      language: locale.toUpperCase(),
    };

    const {
      allPastorsPost: { edges },
    } = await fetchAPI(getPastorsPostsByLang, { variables });

    const {
      pastorsPostsCategories: { edges: categoriesEdges },
    } = await fetchAPI(getPastorsPostsCategoriesByLang, { variables });

    const categoriesList = categoriesEdges
      .filter((item: PastorsPostCategoryNodeProps) => !!item.node.count)
      .map((item: PastorsPostCategoryNodeProps) => ({
        id: item.node.id,
        value: item.node.name,
      }));

    const postsList = edges
      .map((item: any) => item.node)
      .map((item: any) => convertPostListItemFetchedData(item, locale));

    const authorsList = getAuthorsList(postsList);
    const yearsList = getPostsYearsList(postsList);

    return {
      postsList,
      authorsList,
      yearsList,
      categoriesList,
    };
  }

  static async getPostsDataByLangAndAuthor(locale: Locale, author: string) {
    const variables = {
      language: locale.toUpperCase(),
      authorName: author,
    };

    const {
      allPastorsPost: { edges },
    } = await fetchAPI(getPastorsPostsByLangAndAuthor, { variables });

    const postsList = edges
      .map((item: any) => item.node)
      .map((item: any) => convertPostListItemFetchedData(item, locale));

    return postsList;
  }

  static async getLastPostsDataHomePageByLang(locale: string) {
    const variables = {
      language: locale.toUpperCase(),
    };

    const {
      allPastorsPost: { edges },
    } = await fetchAPI(getPastorsPostsByLang, { variables });
    const postsList = edges
      .map((item: any) => item.node)
      .map((item: any) => convertPostListItemFetchedData(item, locale))
      .slice(0, POST_CARD_HOME_PAGE_COUNT);

    return postsList;
  }

  static async getPastorsPostItemDataBySlug(
    id: string,
    locale: Locale,
    author: string,
    idType = 'SLUG'
  ) {
    const variables = {
      id,
      language: locale.toUpperCase(),
      idType,
    };

    const fetchedData = await fetchAPI(getPastorsPostData, { variables });

    if (!!fetchedData?.pastorsPost) {
      const {
        pastorsPost: { translation },
      } = fetchedData;

      const data = convertPostFetchedData(translation, locale);

      const postsListBySameAuthor = await BlogDataApi.getPostsDataByLangAndAuthor(locale, author);

      return {
        postData: data,
        seo: getPostSeoData(translation, locale),
        postsListBySameAuthor,
      };
    }

    return {};
  }

  static async getAllPastorsPostsPaths() {
    const {
      allPastorsPost: { edges: nodes },
    } = await fetchAPI(getAllPastorsPostSlugs);

    const paths = nodes.map(({ node }: { node: PostNodeSlugType }) => {
      return {
        params: {
          postSlug: node.slug,
        },
      };
    });

    return paths;
  }

  static async getPastorsPostsSitemapData() {
    const {
      allPastorsPost: { edges: nodes },
    } = await fetchAPI(getPastorsPostsSitemapData);

    const postsData = nodes.map(({ node }: { node: PostSitemapSourceData }) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    });

    return postsData;
  }
}

export default BlogDataApi;
