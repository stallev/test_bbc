import { EndpointsList } from "@/constants";
import { getMinisterData, getMinistersSlugs } from "@/graphql/staffQueries";
import { fetchAPI } from "./WordPressFetchAPI";

class StaffDataApi {
  static getOtherImagesSizesUrls(item: any) {
    if (!!item.ministerPhoto) {
      let featuredImageLinks: { [key: string]: string } = {};
      
      item.ministerPhoto.map(({ size, url }: { size: string, url: string }) => {
        featuredImageLinks = { ...featuredImageLinks, [size]: url };
  
        return featuredImageLinks;
      });
      
      delete item.ministerPhoto;
      item.imageLinks = featuredImageLinks;
    }
  
    return item;
  }

  static async getMinisterItemsIDs() {
    const response = await fetch(EndpointsList.MinistersCustomRestEndpoint);
    const data = await response.json();

    return data.map((item: any) => item.id);
  }

  static async getMinisterItemData(id: string, locale: string, idType = 'DATABASE_ID') {
    const variables = {
      id,
      language: locale.toUpperCase(), 
      idType,
    }
    
    const { minister: { translation } } = await fetchAPI(getMinisterData, { variables });

    const result  = this.getOtherImagesSizesUrls(translation)
    return result;
  }

   static async getMinisterItemDataBySlug(id: string, locale: string) {
    const variables = {
      id,
      language: locale.toUpperCase(), 
      idType: 'SLUG',
    }
    
    const { minister: { translation } } = await fetchAPI(getMinisterData, { variables });

    const result  = this.getOtherImagesSizesUrls(translation);
    
    return result;
  }

  static async getMinisters(locale: string) {
    const res = await this.getMinisterItemsIDs();
    const resultItems = [];

    for (const item of res) {
      const itemData = await this.getMinisterItemData(item, locale.toUpperCase());
      resultItems.push({ data: itemData });
    }
    
    return resultItems;
  }

  static async getMinistersPaths() {
    const { ministers: { edges: nodes } } = await fetchAPI(getMinistersSlugs);

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

export default StaffDataApi;
