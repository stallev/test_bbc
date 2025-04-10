import { GutenbergBlocksTypes } from '@/constants';
import { MediaGalleryItemProps } from '@/ui/components/MediaGallery/types';
export interface ConvertedGutenbergBlockType {
  type: string;
  order: number;
  content: string | MediaGalleryItemProps[];
  src?: string;
  label?: string;
  text?: string;
  citation?: string;
  headingType?: string;
  caption: string;
}

type ParagraphBlock = {
  type: typeof GutenbergBlocksTypes.paragraph;
  order: number;
  content: string;
};

type ImageBlock = {
  type: typeof GutenbergBlocksTypes.image;
  order: number;
  src: string;
  caption?: string;
};

type HeadingBlock = {
  type: typeof GutenbergBlocksTypes.heading;
  headingType: string;
  order: number;
  content: string;
};

type GalleryBlock = {
  type: typeof GutenbergBlocksTypes.gallery;
  order: number;
  content: ImageBlock[];
};

type FileBlock = {
  type: typeof GutenbergBlocksTypes.file;
  src: string;
  order: number;
  label: string;
};

type AudioBlock = {
  type: typeof GutenbergBlocksTypes.audio;
  src: string;
  order: number;
  caption: string;
};

type VideoBlock = {
  type: typeof GutenbergBlocksTypes.video;
  src: string;
  order: number;
};

type QuoteBlock = {
  type: typeof GutenbergBlocksTypes.quote;
  text: string;
  order: number;
  citation: string;
};

type UndefinedBlock = {
  type: 'undefined';
};

export type GutenbergBlock =
  | ParagraphBlock
  | ImageBlock
  | HeadingBlock
  | GalleryBlock
  | FileBlock
  | AudioBlock
  | VideoBlock
  | QuoteBlock
  | UndefinedBlock;
