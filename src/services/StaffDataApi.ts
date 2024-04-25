import { EndpointsList } from "@/constants";
import { getMinisterData, getMinistersSlugs, getMinistersPostsSitemapData } from "@/graphql/staffQueries";
import { SeoContentDataProps } from "@/ui/components/Seo/types";
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

    const postData  = this.getOtherImagesSizesUrls(translation);
    postData.seo = this.getMinisterPageSeoData(postData, locale);
    
    return postData;
  }

  static getMinisterPageSeoData(postData: any, locale: string) {
    const featuredImageUrl = !!postData.imageLinks.medium.length ? postData.imageLinks.medium : postData.imageLinks.full;
    const otherLanguageCode = postData.translations[0].language.code.toLowerCase();
    const otherTranslationSlug = postData.translations[0].slug;

    const seo: SeoContentDataProps = {
      data: {
        ...postData.seo,
        featuredImageUrl,
        slug: postData.slug,
        title: postData.ministerFirstName + ' ' + postData.ministerLastName,
        alternateLinksSlugs: {
          [locale]: postData.slug,
          [otherLanguageCode]: otherTranslationSlug,
        }
      },
      isPostType: true,
    }
    
    return seo;
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

  static async getMinistersSitemapData() {
    const { ministers: { edges: nodes } } = await fetchAPI(getMinistersPostsSitemapData);

    const postsData = nodes.map(({ node }: any) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    })
        
    return postsData;
  }
}

export default StaffDataApi;
