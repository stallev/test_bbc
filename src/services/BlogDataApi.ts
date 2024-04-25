import { getPastorsPostData, getPastorsPostsByLang, getAllPastorsPostSlugs, getPastorsPostsSitemapData } from "@/graphql/blogQueries";
import { convertPostListItemFetchedData } from "@/utils/convertPostListItemFetchedData";
import { convertPostFetchedData } from "@/utils/convertPostFetchedData";
import { getAuthorsList } from "@/utils/getAuthorsList";
import { getPostsYearsList } from "@/utils/getPostsYearsList";
import { getPostSeoData } from "@/utils/getPostSeoData";
import { fetchAPI } from "./WordPressFetchAPI";

class BlogDataApi {
  static async getPostsDataByLang(locale: string) {
    const variables = {
      language: locale.toUpperCase(),
    }
    
    const { allPastorsPost: { edges } } = await fetchAPI(getPastorsPostsByLang, { variables });
    const postsList = edges
      .map((item:any) => item.node)
      .map((item:any) => convertPostListItemFetchedData(item, locale));
    
    const authorsList = getAuthorsList(postsList);
    const yearsList = getPostsYearsList(postsList);
    
    return {
      postsList,
      authorsList,
      yearsList,
    };
  }

  static async getPastorsPostItemDataBySlug(id: string, locale: string, idType = 'SLUG') {
    const variables = {
      id,
      language: locale.toUpperCase(), 
      idType,
    };
    
    const { pastorsPost: { translation } } = await fetchAPI(getPastorsPostData, { variables });
    const data = convertPostFetchedData(translation, locale);
    
    return {
      postData: data,
      seo: getPostSeoData (translation, locale),
    };
  }

  static async getAllPastorsPostsPaths() {
    const { allPastorsPost: { edges: nodes } } = await fetchAPI(getAllPastorsPostSlugs);

    const paths = nodes.map(({ node }: any) => {
      return {
        params: {
          postSlug: node.slug
        }
      };
    })
        
    return paths;
  }

  static async getPastorsPostsSitemapData() {
    const { allPastorsPost: { edges: nodes } } = await fetchAPI(getPastorsPostsSitemapData);

    const postsData = nodes.map(({ node }: any) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    })
        
    return postsData;
  }
}

export default BlogDataApi;
