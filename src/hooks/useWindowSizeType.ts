import { SIZES } from "../constants/sizes";

export const isMobileWindowSize = (size: number) => {
  return size < SIZES.mobile;
};

export const isTabletWindowSize = (size: number) => {
  return size < SIZES.tablet;
};

export const isSmallMobileWindowSize = (size: number) => {
  return size < SIZES.smallMobile;
};

export const isSmallWindowSize = (size: number) => {
  return size < SIZES.smallDesktop;
};
