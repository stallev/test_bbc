import {
  getPastorsPostData,
  getPastorsPostsByLang,
  getAllPastorsPostSlugs,
  getPastorsPostsSitemapData,
  getPastorsPostsCategoriesByLang,
} from "@/graphql/blogQueries";
import { convertPostListItemFetchedData } from "@/utils/convertPostListItemFetchedData";
import { convertPostFetchedData } from "@/utils/convertPostFetchedData";
import { getAuthorsList } from "@/utils/getAuthorsList";
import { getPostsYearsList } from "@/utils/getPostsYearsList";
import { getPostSeoData } from "@/utils/getPostSeoData";
import { fetchAPI } from "./WordPressFetchAPI";
import {
  POST_CARD_HOME_PAGE_COUNT,
  DEFAULT_FEATURED_IMAGE,
  SAME_AUTHOR_POST_CARD_POST_PAGE_COUNT,
} from "@/constants/mock";
import {
  PostNodeSlugType,
  PostSitemapSourceData,
} from "@/types/WPDataTypes/CommonWPDataTypes";
import { Locale } from "@/i18n.config";
import { PastorsPostCategoryNodeProps } from "@/types/postTypes";

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
    idType = "SLUG"
  ) {
    const variables = {
      id,
      language: locale.toUpperCase(),
      idType,
    };

    const fetchedData = await fetchAPI(getPastorsPostData, { variables });
    const {
      allPastorsPost: { edges: postsEdges },
    } = await fetchAPI(getPastorsPostsByLang, {
      variables: { language: locale.toUpperCase() },
    });

    if (!!fetchedData?.pastorsPost) {
      const {
        pastorsPost: { translation },
      } = fetchedData;
      const authorId = translation.author ? translation.author.node.id : null;
      const postSlug = translation.slug;

      const data = convertPostFetchedData(translation, locale);
      const postsListBySameAuthor = postsEdges
        .filter((item: any) => item.node.author.node.id === authorId)
        .filter((item: any) => item.node.slug !== postSlug)
        .map((item: any) => ({
          slug: item.node.slug,
          title: item.node.title,
          excerpt: item.node.excerpt,
          featuredImageUrl: !!item.node.featuredImage?.node?.mediaItemUrl
            ? item.node.featuredImage.node.mediaItemUrl
            : DEFAULT_FEATURED_IMAGE,
        }))
        .slice(0, SAME_AUTHOR_POST_CARD_POST_PAGE_COUNT);

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
