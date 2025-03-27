import * as IconsComponent from '../../../assets/icons';

interface ComponentsMap {
  [key: string]: React.ComponentType<any>;
}

export const ComponentsMap: ComponentsMap = {
  locationIcon: IconsComponent.LocationIcon,
  logo: IconsComponent.Logo,
};
