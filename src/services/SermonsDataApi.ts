import { getSermonsList, getSermonsCategoriesList } from "@/graphql/sermonsQueries";
import { fetchAPI } from "./WordPressFetchAPI";
import { getFormattedDate } from "@/hooks/useLocaleFormattedDate";

class SermonsDataApi {
  static getOtherImagesSizesUrls(item: any) {
    if (!!item.sermonPhoto) {
      let featuredImageLinks: { [key: string]: string } = {};
      
      item.sermonPhoto.map(({ name, sourceUrl }: { name: string, sourceUrl: string }) => {
        featuredImageLinks = { ...featuredImageLinks, [name]: sourceUrl };
  
        return featuredImageLinks;
      });
      
      delete item.sermonPhoto;
      item.imageLinks = featuredImageLinks;
    }
  
    return item;
  }

  static formattDate(item: any, locale: string) {
    if (!!item?.sermonDate) {
      const formattedDate = getFormattedDate(item.sermonDate, locale);
      item.sermonDate = formattedDate;
    }
  
    return item;
  }

  static async getSermonsList(locale: string) {
    const variables = {
      language: locale.toUpperCase(),
    }

    const {sermons: { edges }} = await fetchAPI(getSermonsList, { variables });

    const sermonsList = edges
      .map(({ node }: {node: any}) => node)
      .map((item: any) => this.getOtherImagesSizesUrls(item))
      .map((item: any) => this.formattDate(item, locale))
      .map((item: any) => {
        return { 
          ...item,
          sermonsTopics: item.sermonsTopics.nodes.map((node: { name: string}) => node.name),
          sermonsPreachers: item.sermonsPreachers.nodes.map((node: { name: string}) => node.name),
          biblebooks: item.biblebooks.nodes.map((node: { name: string}) => node.name),
        };
      });
      
    return sermonsList;
  }

  static async getSermonsCategories(locale: string) {
    const variables = {
      language: locale.toUpperCase(),
    }

    const { 
      biblebooks: { nodes: biblebooks },
      sermonsPreachers: { nodes: preachers },
      sermonsTopics: { nodes: topics },
    } = await fetchAPI(getSermonsCategoriesList, { variables });

    return {
      biblebooks: biblebooks.map((node: { name: string}) => node.name),
      preachers: preachers.map((node: { name: string}) => node.name),
      topics: topics.map((node: { name: string}) => node.name),
    };
  }
}

export default SermonsDataApi;
