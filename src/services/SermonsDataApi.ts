import { getSermonsList, getSermonsCategoriesList } from '@/graphql/sermonsQueries';
import {
  FetchedSermonCardDataType,
  RenderingSermonCardDataType,
} from '@/types/WPDataTypes/SermonPostsDataTypes';
import { getFormattedDate, getDateWithoutTime } from '@/utils/dateFormatter';
import { getCategoryConvertedListItem } from '@/utils/getPostCategoriesList';

import { fetchAPI } from './WordPressFetchAPI';

class SermonsDataApi {
  static getSermonsCardRenderingData(item: any) {
    if (!!item.sermonPhoto) {
      let featuredImageLinks: { [key: string]: string } = {};

      item.sermonPhoto.map(({ name, sourceUrl }: { name: string; sourceUrl: string }) => {
        featuredImageLinks = { ...featuredImageLinks, [name]: sourceUrl };

        return featuredImageLinks;
      });

      delete item.sermonPhoto;
      item.imageLinks = featuredImageLinks;
    }

    if (!!item?.sermonDate) {
      item.sermonDate = getDateWithoutTime(item.sermonDate).toISOString();
    }

    item.topics = getCategoryConvertedListItem(item.sermonsTopics.nodes);
    item.preachers = getCategoryConvertedListItem(item.sermonsPreachers.nodes);
    item.biblebooks = getCategoryConvertedListItem(item.biblebooks.nodes);

    delete item.sermonsTopics;
    delete item.sermonsPreachers;

    return item;
  }

  static formattDate(item: any, locale: string) {
    if (!!item?.sermonDate) {
      const formattedDate = getFormattedDate(item.sermonDate, locale);
      item.sermonDate = formattedDate;
    }

    return item;
  }

  static async getSermonsList(locale: string): Promise<RenderingSermonCardDataType[]> {
    const variables = {
      language: locale.toUpperCase(),
    };

    const {
      sermons: { edges },
    } = await fetchAPI(getSermonsList, { variables });

    const sermonsList = edges
      .map(({ node }: { node: FetchedSermonCardDataType }) => node)
      .map((item: FetchedSermonCardDataType) => this.getSermonsCardRenderingData(item))
      .sort((a: RenderingSermonCardDataType, b: RenderingSermonCardDataType) => {
        const dateA = new Date(a.sermonDate).getTime();
        const dateB = new Date(b.sermonDate).getTime();

        return dateB - dateA;
      });

    return sermonsList;
  }

  static async getSermonsCategories(locale: string) {
    const variables = {
      language: locale.toUpperCase(),
    };

    const {
      biblebooks: { nodes: biblebooks },
      sermonsPreachers: { nodes: preachers },
      sermonsTopics: { nodes: topics },
    } = await fetchAPI(getSermonsCategoriesList, { variables });

    return {
      biblebooks: getCategoryConvertedListItem(biblebooks),
      preachers: getCategoryConvertedListItem(preachers),
      topics: getCategoryConvertedListItem(topics),
    };
  }
}

export default SermonsDataApi;
