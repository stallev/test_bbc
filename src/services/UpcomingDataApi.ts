import { EndpointsList } from "@/constants";
import { getUpcomingEventData, getUpcomingEventDataBySlug, getUpcomingEventsSlugs, getUpcomingEventsSitemapData } from "@/graphql/upcomingEventsQueries";
import { fetchAPI } from "./WordPressFetchAPI";
import { SeoContentDataProps } from "@/ui/components/Seo/types";
import { DEFAULT_FEATURED_IMAGE } from "@/constants/mock";
import { stripHtmlTags } from "@/utils";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import { convertFeaturedImageData } from "@/utils/convertFeaturedImageData";
import { getPostSeoData } from "@/utils/getPostSeoData";

class UpcomingEventsDataApi {
  static async getUpcomingEventsItemsIDs() {
    const response = await fetch(EndpointsList.UpcomingEventsCustomRestEndpoint);
    const data = await response.json();

    return data.map((item: any) => item.id);
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

  static async getUpcomingEventItemDataBySlug(slug: string, locale: string) {
    const variables = {
      slug,
      language: locale.toUpperCase(),
    }
    
    const { upcomingBy: { translation } } = await fetchAPI(getUpcomingEventDataBySlug, { variables });

    return {
      blocks: convertGutenbergBlocksData(translation.blocks),
      featuredImageData: convertFeaturedImageData(translation.featuredImage),
      seo: getPostSeoData(translation, locale),
      title: translation.title,
      slug: translation.slug,
      upcomingEventStart: translation.upcomingEventStart,
      upcomingEventEnd: translation.upcomingEventEnd,
    }
  }

  static getUpcomingEventPageSeoData(postData: any, locale: string) {
    const featuredImageUrl = !!postData.imageLinks.medium.length ? postData.imageLinks.medium : postData.imageLinks.full;
    const otherLanguageCode = postData.translations[0].language.code.toLowerCase();
    const otherTranslationSlug = postData.translations[0].slug;

    const seo: SeoContentDataProps = {
      data: {
        ...postData.seo,
        featuredImageUrl,
        slug: postData.slug,
        title: postData.title,
        alternateLinksSlugs: {
          [locale]: postData.slug,
          [otherLanguageCode]: otherTranslationSlug,
        }
      },
      isPostType: true,
    }
    
    return seo;
  }

  static async getUpcomingEvents(locale: string) {
    const res = await this.getUpcomingEventsItemsIDs();
    const resultItems = [];

    for (const item of res) {
      const itemData = await this.getUpcomingEventItemData(item, locale.toUpperCase());
      const featuredImageUrl = !!itemData.featuredImage ? itemData.featuredImage.node.mediaItemUrl : DEFAULT_FEATURED_IMAGE;
      itemData.shortDescription = stripHtmlTags(itemData.excerpt);
      itemData.featuredImageUrl = featuredImageUrl;

      delete itemData.featuredImage;
      delete itemData.excerpt;

      resultItems.push({ data: itemData });
    }
    
    return resultItems;
  }

  static async getUpcomingEventsPaths() {
    const { allUpcoming: { edges: nodes } } = await fetchAPI(getUpcomingEventsSlugs);

    const paths = nodes.map(({ node }: any) => {
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

    const postsData = nodes.map(({ node }: any) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    })
        
    return postsData;
  }
}

export default UpcomingEventsDataApi;
