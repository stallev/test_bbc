import { getMarkdownPageContentData } from "@/graphql/markdownContentDataQueries";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import { fetchAPI } from "./WordPressFetchAPI";

class PageContentDataApi {
  static async getPageContentData(id: string, idType = 'DATABASE_ID') {
    const variables = {
      id,
      idType,
    }
    
    const { page } = await fetchAPI(getMarkdownPageContentData, { variables });

    const pageContent = convertGutenbergBlocksData(page.blocks);

    return {
      title: page.title,
      pageContent
    };
  }
}

export default PageContentDataApi;
