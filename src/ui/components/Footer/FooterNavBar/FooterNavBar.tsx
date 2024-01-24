import React from "react";
import { CustomLink } from "../../ui-kit";
import { FooterNavBarLinks } from "@/constants/FooterNavBar";
import { LinkTypes } from "@/constants/LinkTypes";
import useTranslationFunction from "@/hooks/useTranslationFunction";

import styles from "./styles/footer-navbar.module.scss";


const FooterNavBar: React.FC = () => {
  const translate = useTranslationFunction();
  
  return (
    <nav className={styles['footer-navbar']}>
      {Object.values(FooterNavBarLinks).map(({ link, label }, index) => (
        <CustomLink
          key={index}
          to={link}
          ariaLabel={translate(label) as string}
          className={styles['footer-navbar__link']}
          type={LinkTypes.navLink}
        >
          {translate(label)}
        </CustomLink>
      ))}
    </nav>
  );
};

export default FooterNavBar;