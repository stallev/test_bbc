import { EndpointsList } from '@/constants';
import {
  getPastorData,
  getMinistersSlugs,
  getMinistersPostsSitemapData,
} from '@/graphql/staffQueries';
import { SeoContentDataProps } from '@/types/globalTypes';
import { PostNodeSlugType, PostSitemapSourceData } from '@/types/WPDataTypes/CommonWPDataTypes';
import {
  MinisterPostDataProps,
  MinisterIDFetchedData,
} from '@/types/WPDataTypes/MinisterPostDataTypes';
import {
  FetchedStaffPersonDataType,
  TranslationFetchedData,
} from '@/types/WPDataTypes/StaffContentDataType';
import { convertGutenbergBlocksData } from '@/utils/convertGutenbergBlocksData';

import { fetchAPI } from './WordPressFetchAPI';

class StaffDataApi {
  static getOtherImagesSizesUrls(item: TranslationFetchedData) {
    return item;
  }

  static async getMinisterItemsIDs() {
    const response = await fetch(EndpointsList.MinistersCustomRestEndpoint);
    const data = await response.json();

    return data.map((item: MinisterIDFetchedData) => item.id);
  }

  static async getMinisterItemData(id: string, locale: string, idType = 'DATABASE_ID') {
    const variables = {
      id,
      language: locale.toUpperCase(),
      idType,
    };

    const result = await fetchAPI(getPastorData, { variables }).then(
      ({ minister: { translation } }: FetchedStaffPersonDataType) =>
        this.getOtherImagesSizesUrls(translation)
    );

    return result;
  }

  static async getMinisterItemDataBySlug(
    id: string,
    locale: string
  ): Promise<MinisterPostDataProps | null | undefined> {
    const variables = {
      id,
      language: locale.toUpperCase(),
      idType: 'SLUG',
    };

    const fetchedData = await fetchAPI(getPastorData, { variables });

    if (!fetchedData?.pastor) {
      return null;
    }

    if (!!fetchedData?.pastor) {
      const {
        pastor: { translation },
      } = fetchedData;

      const postData = this.getOtherImagesSizesUrls(translation);
      const blocks = convertGutenbergBlocksData(postData.blocks);

      return <MinisterPostDataProps>{
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        pastorName: postData.pastorName,
        pastorDepartment: postData.pastorDepartment,
        pastorPosition: postData.pastorPosition,
        pastorUserSlug: postData.pastorUserSlug,
        blocks,
        featuredImage: postData.featuredImage?.node.sourceUrl || null,
      };
    }
  }

  static getMinisterPageSeoData(postData: TranslationFetchedData, locale: string) {
    const featuredImageUrl = '';
    const otherLanguageCode = postData.translations[0].language.code.toLowerCase();
    const otherTranslationSlug = postData.translations[0].slug;

    const seo: SeoContentDataProps = {
      data: {
        featuredImageUrl,
        slug: postData.slug,
        title: postData.title,
        alternateLinksSlugs: {
          [locale]: postData.slug,
          [otherLanguageCode]: otherTranslationSlug,
        },
      },
      isPostType: true,
    };

    return seo;
  }

  static async getMinisters(locale: string) {
    const res = await this.getMinisterItemsIDs();
    const resultItems = [];

    for (const item of res) {
      const itemData = await this.getMinisterItemData(item, locale.toUpperCase());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...ministerData } = itemData;

      resultItems.push(ministerData);
    }

    return resultItems;
  }

  static async getMinistersPaths() {
    const {
      ministers: { edges: nodes },
    } = await fetchAPI(getMinistersSlugs);

    const paths = nodes.map(({ node }: { node: PostNodeSlugType }) => {
      return {
        params: {
          postSlug: node.slug,
        },
      };
    });

    return paths;
  }

  static async getMinistersSitemapData() {
    const {
      ministers: { edges: nodes },
    } = await fetchAPI(getMinistersPostsSitemapData);

    const postsData = nodes.map(({ node }: { node: PostSitemapSourceData }) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    });

    return postsData;
  }
}

export default StaffDataApi;
