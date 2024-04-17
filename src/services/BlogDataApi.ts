import { getPastorsPostData, getPastorsPostsByLang, getAllPastorsPostSlugs } from "@/graphql/blogQueries";
import { convertPostListItemFetchedData } from "@/utils/convertPostListItemFetchedData";
import { convertPostFetchedData } from "@/utils/convertPostFetchedData";
import { getAuthorsList } from "@/utils/getAuthorsList";
import { getPostsYearsList } from "@/utils/getPostsYearsList";
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
    
    return data;
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
}

export default BlogDataApi;
