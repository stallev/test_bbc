import { EndpointsList } from '@/constants';
import { DEFAULT_FEATURED_IMAGE } from '@/constants/mock';
import { getMarkdownPageContentData } from '@/graphql/markdownContentDataQueries';
import { SeoContentDataProps } from '@/types/globalTypes';
import { AboutUsPageDataProps } from '@/types/WPDataTypes/AboutUsPageDataTypes';
import { ConvertedGutenbergBlockType } from '@/types/WPDataTypes/GutenbergBlocksTypes';
import { convertGutenbergBlocksData } from '@/utils/convertGutenbergBlocksData';

import { fetchAPI } from './WordPressFetchAPI';

class PageContentDataApi {
  static async getPageContentData(id: string, idType = 'DATABASE_ID') {
    const variables = {
      id,
      idType,
    };

    const { page } = await fetchAPI(getMarkdownPageContentData, { variables });
    const featuredImageUrl = !!page?.featuredImage
      ? page.featuredImage.node.mediaItemUrl
      : DEFAULT_FEATURED_IMAGE;

    const seo: SeoContentDataProps = {
      data: {
        ...page.seo,
        featuredImageUrl,
        title: page.title,
        slug: page.slug,
      },
      isPostType: false,
    };

    const pageContent = convertGutenbergBlocksData(
      page.blocks
    ) as unknown as ConvertedGutenbergBlockType[];

    return {
      title: page.title,
      slug: page.slug,
      pageContent,
      seo,
      translations: page?.translations,
      featuredImage: page?.featuredImage,
    };
  }

  static async getAboutUsData(id: string): Promise<AboutUsPageDataProps> {
    const response = await fetch(`${EndpointsList.AboutUsRestEndpoint}${id}`);
    const data = await response.json();

    return data;
  }
}

export default PageContentDataApi;
