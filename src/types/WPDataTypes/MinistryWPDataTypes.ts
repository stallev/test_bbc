import { SeoContentDataProps } from '../globalTypes';
import { ConvertedGutenbergBlockType } from './GutenbergBlocksTypes';

export interface MinistryConvertedDataType {
  seo: SeoContentDataProps;
  ministryInfoData: MinistryInfoDataType;
}

export interface MinistryInfoDataType {
  title: string;
  pageContent: ConvertedGutenbergBlockType[];
  ministryDays: string;
  ministryHours: string;
  ministryShortDescription: string;
  ministryImagesData: MinistryImageData[];
}

export interface MinistryImageData {
  caption: string;
  filename: string;
  alt: string;
  imageUrl: string;
}

export interface Seo {
  metaDesc: string;
  metaRobotsNofollow: string;
  metaRobotsNoindex: string;
  readingTime: number;
  schema: Schema;
  title: string;
}

export interface Schema {
  pageType: string[];
}

export interface MinistryMediaGalleryItem {
  node: MinistryMediaGalleryNode;
}

export interface MinistryMediaGalleryNode {
  alt: string;
  caption: string;
  filename: string;
  sizes: MinistryMediaGallerySize[];
}

export interface MinistryMediaGallerySize {
  size: string;
  url: string;
}

export interface Block {
  name?: string;
  order?: number;
  saveContent?: string;
  attributes?: Attributes;
  innerBlocks?: InnerBlock[];
  mediaItem?: MediaItem2;
  originalContent?: string;
}

export interface Attributes {
  href?: string;
  textLinkHref?: string;
  src?: string;
  level?: number;
}

export interface InnerBlock {
  originalContent?: string;
  mediaItem?: MediaItem;
  name?: string;
  order?: number;
}

export interface MediaItem {
  node: Node2;
}

export interface Node2 {
  mediaItemUrl: string;
  caption: string;
}

export interface MediaItem2 {
  node: Node3;
}

export interface Node3 {
  mediaItemUrl: string;
  caption: string;
}
