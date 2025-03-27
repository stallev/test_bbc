import React from "react";
import styles from "./styles/NavDropDown.module.scss";
import { CustomLink } from "../ui-kit";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import { LinkTypes } from "@/constants/LinkTypes";
import { NavBarLinkProps } from "@/types/globalTypes";

interface NavDropDownProps {
  childrenLinks?: NavBarLinkProps []
  onClick?: () => {}
}

const NavDropDown: React.FC<NavDropDownProps> = ({
  childrenLinks,
  onClick,
}) => {
  const translate = useClientTranslationFunction();
  return (
    <div className={styles.navDropDown}>
      {childrenLinks &&
        childrenLinks.map(({ link, label }, index) => (
          <CustomLink
            key={index}
            ariaLabel={translate(label) as string}
            to={link}
            className={styles.navDropDown__link}
            type={LinkTypes.navLink}
            onCLick={onClick}
          >
            {translate(label)}
          </CustomLink>
        ))}
    </div>
  );
};

export default NavDropDown;
