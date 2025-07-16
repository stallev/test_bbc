import { notFound } from 'next/navigation';
import { DEFAULT_FEATURED_IMAGE } from '@/constants/mock';
import { getMinistryData, getMinistriesPostsSitemapData } from '@/graphql/ministryQueries';
import { i18n } from '@/i18n.config';
import { SeoContentDataProps } from '@/types/globalTypes';
import { PostSitemapSourceData } from '@/types/WPDataTypes/CommonWPDataTypes';
import {
  MinistryMediaGallerySize,
  MinistryMediaGalleryItem,
  MinistryConvertedDataType,
  MinistryImageData,
} from '@/types/WPDataTypes/MinistryWPDataTypes';
import { getBase64BlurData } from '@/utils/getBase64BlurData';

import { parseBlocks } from '@/utils/htmlParser';
import { fetchAPI } from './WordPressFetchAPI';

class MinistryDataApi {
  static getImageUrl(sizes: MinistryMediaGallerySize[]): string {
    let featuredImageLinks: { [key: string]: string } = {};

    sizes.map(({ size, url }: { size: string; url: string }) => {
      featuredImageLinks = { ...featuredImageLinks, [size]: url };
    });

    return featuredImageLinks?.medium ? featuredImageLinks?.medium : featuredImageLinks?.large;
  }

  static async getMinistryPageData(
    postSlug: string,
    locale: string
  ): Promise<MinistryConvertedDataType> {
    const variables = {
      postSlug,
      language: locale.toUpperCase(),
    };

    const fetchMinistry = async (lang: string) => {
      const { ministry } = await fetchAPI(getMinistryData, {
        variables: { ...variables, language: lang },
      });
      return ministry;
    };

    let ministryData = await fetchMinistry(variables.language);

    if (!ministryData || !ministryData.translation) {
      const fallbackLang = locale === i18n.defaultLocale ? 'RU' : i18n.defaultLocale.toUpperCase();
      ministryData = await fetchMinistry(fallbackLang);

      if (!ministryData || !ministryData.translation) {
        return notFound();
      }
    }

    const {
      translation: {
        featuredImage,
        title,
        // seo: seoData,
        content,
        ministryDays,
        ministryHours,
        ministryMediaGallery,
        ministryShortDescription,
        slug,
      },
    } = ministryData;

    const isMinistryMediaGalleryValidData =
      ministryMediaGallery.length > 0 &&
      ministryMediaGallery.every((item: MinistryMediaGalleryItem) => item.node.filename.length > 0);

    const featuredImageUrl = !!featuredImage
      ? featuredImage.node.mediaItemUrl
      : DEFAULT_FEATURED_IMAGE;

    const ministryImagesData: MinistryImageData[] | null = isMinistryMediaGalleryValidData
      ? await Promise.all(
          ministryMediaGallery.map(async ({ node }: MinistryMediaGalleryItem) => {
            const imageBase64Url = await getBase64BlurData(this.getImageUrl(node?.sizes));

            return {
              caption: node?.caption,
              filename: node?.filename,
              alt: node?.alt,
              imageUrl: this.getImageUrl(node?.sizes),
              imageBase64Url,
            };
          })
        )
      : [];

    const seo: SeoContentDataProps = {
      data: {
        // ...seoData,
        featuredImageUrl,
        title,
        slug,
      },
      isPostType: false,
    };

    const ministryInfoData = {
      title,
      content: parseBlocks(content),
      ministryDays,
      ministryHours,
      ministryShortDescription,
      ministryImagesData,
    };

    return {
      seo,
      ministryInfoData,
    };
  }

  static async getMinistriesSitemapData() {
    const {
      ministries: { edges: nodes },
    } = await fetchAPI(getMinistriesPostsSitemapData);

    const postsData = nodes.map(({ node }: { node: PostSitemapSourceData }) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    });

    return postsData;
  }
}

export default MinistryDataApi;
