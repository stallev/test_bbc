import { notFound } from 'next/navigation';
import { EndpointsList } from '@/constants';
import { DEFAULT_FEATURED_IMAGE } from '@/constants/mock';
import {
  getUpcomingEventData,
  getUpcomingEventDataBySlug,
  getUpcomingEventsSitemapData,
} from '@/graphql/upcomingEventsQueries';
import { i18n } from '@/i18n.config';
import { PostSitemapSourceData } from '@/types/WPDataTypes/CommonWPDataTypes';
import {
  FetchedRestUpcomingEventType,
  UpcomingEventDataProps,
} from '@/types/WPDataTypes/UpcomingEventDataTypes';
import { UpcomingEventCardItemProps } from '@/ui/components/page-specific/upcoming-event/UpcomingEventCard/types';
import { stripHtmlTags } from '@/utils';
import { convertFeaturedImageData } from '@/utils/convertFeaturedImageData';
import { getPostSeoData } from '@/utils/getPostSeoData';
import { fetchAPI } from './WordPressFetchAPI';

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
    };

    const fetchUpcomingEvent = async (lang: string) => {
      const { upcoming } = await fetchAPI(getUpcomingEventData, {
        variables: { ...variables, language: lang },
      });
      return upcoming;
    };

    let upcomingEventData = await fetchUpcomingEvent(variables.language);

    if (!upcomingEventData || !upcomingEventData.translation) {
      const fallbackLang = locale === i18n.defaultLocale ? 'RU' : i18n.defaultLocale.toUpperCase();
      upcomingEventData = await fetchUpcomingEvent(fallbackLang);

      if (!upcomingEventData || !upcomingEventData.translation) {
        return null;
      }
    }

    return upcomingEventData.translation;
  }

  static async getUpcomingEventItemDataBySlug(
    slug: string,
    locale: string
  ): Promise<UpcomingEventDataProps | null> {
    const variables = {
      slug,
      language: locale.toUpperCase(),
    };

    const fetchUpcomingEvent = async (lang: string) => {
      const { upcomingBy } = await fetchAPI(getUpcomingEventDataBySlug, {
        variables: { ...variables, language: lang },
      });
      return upcomingBy;
    };

    let upcomingByData = await fetchUpcomingEvent(variables.language);

    if (!upcomingByData || !upcomingByData.translation) {
      const fallbackLang = locale === i18n.defaultLocale ? 'RU' : i18n.defaultLocale.toUpperCase();
      upcomingByData = await fetchUpcomingEvent(fallbackLang);

      if (!upcomingByData || !upcomingByData.translation) {
        return notFound();
      }
    }

    const translation = upcomingByData.translation;

    return {
      featuredImageData: convertFeaturedImageData(translation.featuredImage),
      seo: getPostSeoData(translation, locale),
      title: translation.title,
      slug: translation.slug,
      upcomingEventStart: translation.upcomingEventStart,
      upcomingEventEnd: translation.upcomingEventEnd,
    };
  }

  static async getUpcomingEvents(locale: string): Promise<UpcomingEventCardItemProps[]> {
    const res = await this.getUpcomingEventsItemsIDs();
    console.log(res);
    const resultItems = [];

    for (const item of res) {
      const itemData = await this.getUpcomingEventItemData(item, locale.toUpperCase());
      console.log('itemData', itemData);
      if (!itemData) continue;

      const featuredImageUrl = !!itemData.featuredImage
        ? itemData.featuredImage.node.mediaItemUrl
        : DEFAULT_FEATURED_IMAGE;

      itemData.upcomingEventShortDescription = stripHtmlTags(
        itemData?.upcomingEventShortDescription
          ? itemData.upcomingEventShortDescription
          : itemData.excerpt
      );

      itemData.featuredImageUrl = featuredImageUrl;

      delete itemData.featuredImage;
      delete itemData.excerpt;

      resultItems.push({ ...itemData });
    }

    return resultItems;
  }

  static async getUpcomingEventsReduced(locale: string): Promise<UpcomingEventCardItemProps[]> {
    const items = await this.getUpcomingEvents(locale);

    return items.slice(0, 3);
  }

  static async getUpcomingEventsSitemapData() {
    const {
      allUpcoming: { edges: nodes },
    } = await fetchAPI(getUpcomingEventsSitemapData);

    const postsData = nodes.map(({ node }: { node: PostSitemapSourceData }) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    });

    return postsData;
  }
}

export default UpcomingEventsDataApi;
