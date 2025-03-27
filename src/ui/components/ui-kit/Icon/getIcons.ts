import * as IconsComponent from '../../../assets/icons';

interface ComponentsMap {
  [key: string]: React.ComponentType<any>;
}

export const ComponentsMap: ComponentsMap = {
  locationIcon: IconsComponent.LocationIcon,
  logo: IconsComponent.Logo,
  hamburger: IconsComponent.HamburgerIcon,
  cross: IconsComponent.CrossIcon,
  boldCross: IconsComponent.BoldCrossIcon,
  rightArrow: IconsComponent.RightArrowIcon,
  playControl: IconsComponent.PlayControlIcon,
  stopPlayControl: IconsComponent.StopPlayControlIcon,
  customQuotes: IconsComponent.CustomQuotesIcon,
  leftArrow: IconsComponent.LeftArrowIcon,
  smallLogo: IconsComponent.SmallLogoIcon,
  prayer: IconsComponent.PrayerIcon,
  leftQuotes: IconsComponent.LeftQuotes,
  rightQuotes: IconsComponent.RightQuotes,
  donateIcon: IconsComponent.DonateIcon,
};
