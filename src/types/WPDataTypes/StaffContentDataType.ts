import { GutenbergBlockType } from './PageContentDataTypes';

export interface RenderedPastorCardDataType {
  data: TranslationFetchedData;
}

export interface FetchedStaffPersonDataType {
  minister: {
    translation: TranslationFetchedData;
  };
}

export interface TranslationFetchedData {
  pastorName: string;
  pastorPosition: string;
  pastorUserSlug: string;
  pastorDepartment: string;
  title: string;
  blocks: GutenbergBlockType[];
  slug: string;
  excerpt: string;
  translations: Translation[];
  ministerPhoto?: MinisterPhoto[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  featuredImage: any;
}

export interface Schema {
  pageType: string[];
}

export interface Translation {
  slug: string;
  language: Language;
}

export interface Language {
  code: string;
}

export interface MinisterPhoto {
  size: string;
  url: string;
}
