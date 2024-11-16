"use client"

import React, { useState } from "react";
import ParentLinks from "./ParentLinks";
import ChildrenLinks from "./ChildrenLinks";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  isMobileWindowSize,
  isSmallWindowSize,
} from "@/hooks/useWindowSizeType";
import { useAppContext } from "../../globalState/ContextHook/contextHook";
import styles from "./styles/NavPopUp.module.scss";

interface NavBarLinks {
  [key: string]: {
    link: string;
    label: string;
    children?: Record<string, { link: string; label: string }>;
  };
}

interface NavPopUpProps {
  navBarLinks: NavBarLinks
  translations: Record<string, string>
}
const NavPopUp: React.FC<NavPopUpProps> = ({ navBarLinks, translations }) => {
  const { dispatch, state } = useAppContext();
  const windowsize = useWindowDimensions();
  const tabletSize = isSmallWindowSize(windowsize.width);

  const toggleMenuButton = () => {
    toggleMenu(dispatch);
  };

  const [activeChildrenLinks, setActiveChildrenLinks] = useState(false);
  const [childrenLinks, setChildrenLinks] = useState({});

  const handleBackClick = () => {
    setActiveChildrenLinks(false);
  };

  const handleViewChildren = (children: any) => {
    setActiveChildrenLinks(true);
    setChildrenLinks(children);
  };

  return (
    state.isMenuOpen && tabletSize &&
      <div className={styles.navPopUp}>
        <div className={styles.popUpLinks}>
          {activeChildrenLinks ? (
            <ChildrenLinks
              childrenLinks={Object.values(childrenLinks)}
              translations={translations}
              handleLinkClick={toggleMenuButton}
              handleBackClick={handleBackClick}
            />
          ) : (
            <ParentLinks
              parentLinks={navBarLinks}
              translations={translations}
              handleLinkClick={toggleMenuButton}
              handleDropdownClick={handleViewChildren}
            />
          )}
        </div>
      </div>
  );
};

export default NavPopUp;
