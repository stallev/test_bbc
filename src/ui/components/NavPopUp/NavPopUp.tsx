import React, { useState } from "react";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import ParentLinks from "./ParentLinks";
import ChildrenLinks from "./ChildrenLinks";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
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
  navBarLinks: NavBarLinks;
}
const NavPopUp: React.FC<NavPopUpProps> = ({ navBarLinks }) => {
  const translate = useTranslationFunction();
  const { dispatch } = useAppContext();

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
    <div className={styles.navPopUp}>
      <div className={styles.popUpLinks}>
        {activeChildrenLinks ? (
          <ChildrenLinks
            childrenLinks={Object.values(childrenLinks)}
            translate={translate}
            handleLinkClick={toggleMenuButton}
            handleBackClick={handleBackClick}
          />
        ) : (
          <ParentLinks
            parentLinks={navBarLinks}
            translate={translate}
            handleLinkClick={toggleMenuButton}
            handleDropdownClick={handleViewChildren}
          />
        )}
      </div>
    </div>
  );
};

export default NavPopUp;
