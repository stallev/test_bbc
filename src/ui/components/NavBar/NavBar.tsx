import React from "react";
import { CustomLink } from "../ui-kit";
import { NavBarLinks } from "@/constants/NavBarLinks";
import { LinkTypes } from "@/constants/LinkTypes";
import styles from "./styles/navbar.module.scss";

interface NavBarProps {
  translate: (term: string) => React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ translate }) => {
  return (
    <nav className={styles.navbar}>
      {Object.values(NavBarLinks).map(({ link, label }, index) => (
        <CustomLink
          key={index}
          to={link}
          ariaLabel={translate(label) as string}
          className={styles.navbar__link}
          type={LinkTypes.navLink}
        >
          {translate(label)}
        </CustomLink>
      ))}
    </nav>
  );
};

export default NavBar;