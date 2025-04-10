import { NO_IMAGE } from '@/constants/mock';
import { FeaturedImageMediaItemUrlProps, PostFeaturedImageData } from '@/types/postTypes';

export const convertFeaturedImageData = (
  data: FeaturedImageMediaItemUrlProps
): PostFeaturedImageData => {
  return {
    isExist: data?.node?.mediaItemUrl ? true : false,
    featuredImageUrl: data?.node?.mediaItemUrl ? data?.node?.mediaItemUrl : NO_IMAGE,
  };
};
