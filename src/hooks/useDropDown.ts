import React from "react";
import { MobileMenuStateProps, NavBarMenuItemProps } from "@/types/globalTypes";

interface useDropdownProps {
  setMobileMenuState: React.Dispatch<React.SetStateAction<MobileMenuStateProps>>
  mobileMenuState: MobileMenuStateProps
}

const useDropdown = ({mobileMenuState, setMobileMenuState}: useDropdownProps) => {
  const { isMenuOpen, activeDropDownMenuItem } = mobileMenuState;

  const handleClick = (menuItem: NavBarMenuItemProps) => {
    if(!!menuItem && !!activeDropDownMenuItem && activeDropDownMenuItem.label === menuItem?.label) {
      setMobileMenuState({
        ...mobileMenuState,
        activeDropDownMenuItem: false
      })
    } else {
      setMobileMenuState({
        ...mobileMenuState,
        activeDropDownMenuItem: menuItem
      })
    }
  };

  const handleMouseEnter = (menuItem: NavBarMenuItemProps) => {
    setMobileMenuState({
      ...mobileMenuState,
      activeDropDownMenuItem: menuItem
    })
  };

  const handleMouseLeave = () => {
    setMobileMenuState({
      ...mobileMenuState,
      activeDropDownMenuItem: false
    })
  };

  return { handleMouseEnter, handleMouseLeave, handleClick };
};

export default useDropdown;
