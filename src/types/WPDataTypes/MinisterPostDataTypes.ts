import { ConvertedGutenbergBlockType } from './GutenbergBlocksTypes';
import { SeoContentDataProps } from '../globalTypes';

interface Translation {
  slug: string;
  language: {
    code: string;
  };
}

export interface MinisterPostDataProps {
  ministerFirstName: string;
  ministerLastName: string;
  ministerPosition: string;
  ministerDepartment: string;
  ministerDescription: string;
  ministerUserSlug: string;
  slug: string;
  excerpt: string;
  blocks: ConvertedGutenbergBlockType[];
  imageLinks: Record<string, string>;
  translations: Translation[];
  seo: SeoContentDataProps;
}
