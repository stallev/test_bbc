import { getSermonsList, getSermonsCategoriesList } from '@/graphql/sermonsQueries';
import {
  FetchedSermonCardDataType,
  RenderingSermonCardDataType,
} from '@/types/WPDataTypes/SermonPostsDataTypes';
import { getFormattedDate, getDateWithoutTime } from '@/utils/dateFormatter';
import { getCategoryConvertedListItem } from '@/utils/getPostCategoriesList';

import { fetchAPI } from './WordPressFetchAPI';

class SermonsDataApi {
  static getSermonsCardRenderingData(item: FetchedSermonCardDataType): RenderingSermonCardDataType {
    if (!!item?.sermonDate) {
      item.sermonDate = getDateWithoutTime(item.sermonDate).toISOString();
    }

    return {
      title: item.title,
      sermonShortDescription: item.sermonShortDescription,
      sermonDate: item.sermonDate,
      sermonAudio: item.sermonAudio,
      sermonYoutubeLink: item.sermonYoutubeLink,
      sermonBookChapter: item.sermonBookChapter,
      sermonBookChapterTextNumber: item.sermonBookChapterTextNumber,
      biblebooks: getCategoryConvertedListItem(item.biblebooks.nodes),
      imageLinks: item.imageLinks,
      topics: getCategoryConvertedListItem(item.sermonsTopics.nodes),
      preachers: getCategoryConvertedListItem(item.sermonsPreachers.nodes),
    };
  }

  static formattDate(item: FetchedSermonCardDataType, locale: string) {
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
