import { MobileMenuStateProps } from '@/types/globalTypes';

export interface NavBarProps {
  setMobileMenuState: React.Dispatch<React.SetStateAction<MobileMenuStateProps>>;
  mobileMenuState: MobileMenuStateProps;
  toggleMobileMenu: () => void;
}
