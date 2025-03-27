import { EndpointsList } from "@/constants";
import { getUpcomingEventData, getUpcomingEventDataBySlug, getUpcomingEventsSlugs, getUpcomingEventsSitemapData } from "@/graphql/upcomingEventsQueries";
import { fetchAPI } from "./WordPressFetchAPI";
import { DEFAULT_FEATURED_IMAGE } from "@/constants/mock";
import { stripHtmlTags } from "@/utils";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import { convertFeaturedImageData } from "@/utils/convertFeaturedImageData";
import { getPostSeoData } from "@/utils/getPostSeoData";
import { FetchedRestUpcomingEventType, UpcomingEventDataProps } from "@/types/WPDataTypes/UpcomingEventDataTypes";
import { PostNodeSlugType, PostSitemapSourceData } from "@/types/WPDataTypes/CommonWPDataTypes";
import { ConvertedGutenbergBlockType } from "@/types/WPDataTypes/GutenbergBlocksTypes";

class UpcomingEventsDataApi {
  static async getUpcomingEventsItemsIDs() {
    const response = await fetch(EndpointsList.UpcomingEventsCustomRestEndpoint);
    const data = await response.json();

    return data.map((item: FetchedRestUpcomingEventType) => item.id);
  }

  static async getUpcomingEventItemData(id: string, locale: string, idType = 'DATABASE_ID') {
    const variables = {
      id,
      language: locale.toUpperCase(), 
      idType,
    }
    
    const { upcoming: { translation } } = await fetchAPI(getUpcomingEventData, { variables });
    
    return translation;
  }

  static async getUpcomingEventItemDataBySlug(slug: string, locale: string): Promise<UpcomingEventDataProps | null> {
    const variables = {
      slug,
      language: locale.toUpperCase(),
    }

    const fetchedData = await fetchAPI(getUpcomingEventDataBySlug, { variables });

    if(!!fetchedData?.upcomingBy) {
      const { upcomingBy: { translation } } = fetchedData;
      
      const convertedBlocks = convertGutenbergBlocksData(translation.blocks);
      if (!Array.isArray(convertedBlocks)) {
        throw new Error('Invalid blocks data format');
      }

      return {
        blocks: convertedBlocks as unknown as ConvertedGutenbergBlockType[],
        featuredImageData: convertFeaturedImageData(translation.featuredImage),
        seo: getPostSeoData(translation, locale),
        title: translation.title,
        slug: translation.slug,
        upcomingEventStart: translation.upcomingEventStart,
        upcomingEventEnd: translation.upcomingEventEnd,
      }
    }

    return null;
  }

  static async getUpcomingEvents(locale: string): Promise<any> {
    const res = await this.getUpcomingEventsItemsIDs();
    const resultItems = [];

    for (const item of res) {
      const itemData = await this.getUpcomingEventItemData(item, locale.toUpperCase());
      const featuredImageUrl = !!itemData.featuredImage ? itemData.featuredImage.node.mediaItemUrl : DEFAULT_FEATURED_IMAGE;

      itemData.upcomingEventShortDescription = stripHtmlTags(itemData?.upcomingEventShortDescription ? itemData.upcomingEventShortDescription : itemData.excerpt);
      
      itemData.featuredImageUrl = featuredImageUrl;

      delete itemData.featuredImage;
      delete itemData.excerpt;

      resultItems.push({ ...itemData });
    }
    
    return resultItems;
  }

  static async getUpcomingEventsReduced(locale: string): Promise<any> {
    const items = await this.getUpcomingEvents(locale);
    
    return items.slice(0, 3);
  }

  static async getUpcomingEventsPaths() {
    const { allUpcoming: { edges: nodes } } = await fetchAPI(getUpcomingEventsSlugs);

    const paths = nodes.map(({ node }: { node: PostNodeSlugType }) => {
      return {
        params: {
          postSlug: node.slug
        }
      };
    })
        
    return paths;
  }

  static async getUpcomingEventsSitemapData() {
    const { allUpcoming: { edges: nodes } } = await fetchAPI(getUpcomingEventsSitemapData);

    const postsData = nodes.map(({ node }: { node: PostSitemapSourceData }) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    })
        
    return postsData;
  }
}

export default UpcomingEventsDataApi;
