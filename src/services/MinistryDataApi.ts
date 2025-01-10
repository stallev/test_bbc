import { getMinistryData } from "@/graphql/ministryQueries";
import { fetchAPI } from "./WordPressFetchAPI";
import { convertGutenbergBlocksData } from "@/utils/convertGutenbergBlocksData";
import { MinistryMediaGallerySize, MinistryMediaGalleryItem } from "@/types/WPDataTypes/MinistryWPDataTypes";
import { DEFAULT_FEATURED_IMAGE } from "@/constants/mock";
import { SeoContentDataProps } from "@/types/globalTypes";
import { MinistryConvertedDataType } from "@/types/WPDataTypes/MinistryWPDataTypes";

class MinistryDataApi {
  static getImageUrl(sizes: MinistryMediaGallerySize[]): string {
    let featuredImageLinks: { [key: string]: string } = {};

    sizes.map(({ size, url }: { size: string, url: string }) => {
      featuredImageLinks = { ...featuredImageLinks, [size]: url };
    });

    return featuredImageLinks?.medium ? featuredImageLinks?.medium : featuredImageLinks?.large;
  }

  static async getMinistryPageData(id: string, locale: string, idType = 'DATABASE_ID'): Promise<MinistryConvertedDataType> {
    const variables = {
      id,
      language: locale.toUpperCase(),
      idType,
    }

    const { ministry: { translation: {
      featuredImage,
      title,
      seo: seoData,
      slug,
      blocks,
      ministryDays,
      ministryHours,
      ministryMediaGallery,
      ministryShortDescription,
    } } } = await fetchAPI(getMinistryData, { variables });

    const featuredImageUrl = !!featuredImage ? featuredImage.node.mediaItemUrl : DEFAULT_FEATURED_IMAGE;

    const ministryImagesData = ministryMediaGallery.map(({ node }: MinistryMediaGalleryItem) => ({
      caption: node?.caption,
      filename: node?.filename,
      alt: node?.alt,
      imageUrl: this.getImageUrl(node?.sizes),
    }))

    const seo: SeoContentDataProps = {
      data: {
        ...seoData,
        featuredImageUrl,
        title,
        slug,
      },
      isPostType: false,
    }

    const pageContent = convertGutenbergBlocksData(blocks);

    return {
      title,
      slug,
      pageContent,
      seo,
      featuredImageUrl,
      ministryDays,
      ministryHours,
      ministryShortDescription,
      ministryImagesData,
    };
  }
}

export default MinistryDataApi;
