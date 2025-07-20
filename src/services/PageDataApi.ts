import { notFound } from 'next/navigation';
import { EndpointsList } from '@/constants';
import { DEFAULT_FEATURED_IMAGE } from '@/constants/mock';
import { getMarkdownPageContentData } from '@/graphql/markdownContentDataQueries';
import { SeoContentDataProps } from '@/types/globalTypes';
import { AboutUsPageDataProps } from '@/types/WPDataTypes/AboutUsPageDataTypes';
import { parseBlocks } from '@/utils/htmlParser';
import { fetchAPI } from './WordPressFetchAPI';

class PageContentDataApi {
  static async getPageContentData(slug: string) {
    const variables = {
      slug: `/${slug}/`,
    };

    const { page } = await fetchAPI(getMarkdownPageContentData, { variables });

    if (!page) {
      return notFound();
    }

    const featuredImageUrl = !!page?.featuredImage
      ? page.featuredImage.node.mediaItemUrl
      : DEFAULT_FEATURED_IMAGE;

    const seo: SeoContentDataProps = {
      data: {
        // ...page.seo,
        featuredImageUrl,
        title: page.title,
        slug: page.slug,
      },
      isPostType: false,
    };

    return {
      title: page.title,
      slug: page.slug,
      content: parseBlocks(page.content),
      seo,
      translations: page?.translations,
      featuredImage: page?.featuredImage,
    };
  }

  static async getAboutUsData(slug: string): Promise<AboutUsPageDataProps> {
    const response = await fetch(`${EndpointsList.AboutUsRestEndpoint}${slug}`);
    const data = await response.json();

    return data;
  }
}

export default PageContentDataApi;
