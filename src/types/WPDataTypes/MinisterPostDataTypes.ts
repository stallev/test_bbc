import { ConvertedGutenbergBlockType } from './GutenbergBlocksTypes';

interface Translation {
  slug: string;
  language: {
    code: string;
  };
}

export interface MinisterPostDataProps {
  title: string;
  slug: string;
  excerpt: string;
  pastorName: string;
  pastorPosition: string;
  pastorUserSlug: string;
  pastorDepartment: string;
  blocks: ConvertedGutenbergBlockType[];
  featuredImage: string | null;
  translations: Translation[];
}

export interface MinisterIDFetchedData {
  value: string;
  type: string;
  subtype: string;
  id: string;
}
