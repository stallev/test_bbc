import React from "react";
import styles from "./styles/NavDropDown.module.scss";
import { CustomLink } from "../ui-kit";
import { LinkTypes } from "@/constants/LinkTypes";

interface Props {
  childrenLinks?: Record<string, { link: string; label: string }>
  translations: Record<string, string>
  onClick?: any
}

const NavDropDown: React.FC<Props> = ({
  childrenLinks,
  translations,
  onClick,
}) => {
  return (
    <div className={styles.navDropDown}>
      {childrenLinks &&
        Object.values(childrenLinks).map(({ link, label }, index) => (
          <CustomLink
            key={index}
            ariaLabel={translations[label] as string}
            to={link}
            className={styles.navDropDown__link}
            type={LinkTypes.navLink}
            onCLick={onClick}
          >
            {translations[label]}
          </CustomLink>
        ))}
    </div>
  );
};

export default NavDropDown;
