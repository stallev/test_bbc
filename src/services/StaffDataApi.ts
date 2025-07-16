import { notFound } from 'next/navigation';
import { EndpointsList } from '@/constants';
import {
  getPastorData,
  getMinistersSlugs,
  getMinistersPostsSitemapData,
} from '@/graphql/staffQueries';
import { i18n } from '@/i18n.config';
import { SeoContentDataProps } from '@/types/globalTypes';
import { PostNodeSlugType, PostSitemapSourceData } from '@/types/WPDataTypes/CommonWPDataTypes';
import {
  MinisterPostDataProps,
  MinisterIDFetchedData,
} from '@/types/WPDataTypes/MinisterPostDataTypes';
import { TranslationFetchedData } from '@/types/WPDataTypes/StaffContentDataType';

import { parseBlocks } from '@/utils/htmlParser';
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

    const fetchMinister = async (lang: string) => {
      const { minister } = await fetchAPI(getPastorData, {
        variables: { ...variables, language: lang },
      });
      return minister;
    };

    let ministerData = await fetchMinister(variables.language);

    if (!ministerData || !ministerData.translation) {
      const fallbackLang = locale === i18n.defaultLocale ? 'RU' : i18n.defaultLocale.toUpperCase();
      ministerData = await fetchMinister(fallbackLang);

      if (!ministerData || !ministerData.translation) {
        return null;
      }
    }

    return this.getOtherImagesSizesUrls(ministerData.translation);
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

    const fetchMinister = async (lang: string) => {
      const { pastor } = await fetchAPI(getPastorData, {
        variables: { ...variables, language: lang },
      });
      return pastor;
    };

    let pastorData = await fetchMinister(variables.language);

    if (!pastorData || !pastorData.translation) {
      const fallbackLang = locale === i18n.defaultLocale ? 'RU' : i18n.defaultLocale.toUpperCase();
      pastorData = await fetchMinister(fallbackLang);

      if (!pastorData?.translation) {
        return notFound();
      }
    }

    const postData = this.getOtherImagesSizesUrls(pastorData.translation);

    return <MinisterPostDataProps>{
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      pastorName: postData.pastorName,
      pastorDepartment: postData.pastorDepartment,
      pastorPosition: postData.pastorPosition,
      pastorUserSlug: postData.pastorUserSlug,
      content: parseBlocks(pastorData.translation.content),
      featuredImage: postData.featuredImage?.node.sourceUrl || null,
    };
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
      if (!itemData) continue;

      resultItems.push(itemData);
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
