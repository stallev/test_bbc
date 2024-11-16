import React from "react";
import { CustomLink } from "../../ui-kit";
import { FooterNavBarLinks } from "@/constants/FooterNavBar";
import { LinkTypes } from "@/constants/LinkTypes";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import { TranslationsType } from "@/types/globalTypes";

import styles from "./styles/footer-navbar.module.scss";


const FooterNavBar: React.FC<TranslationsType> = ({ translations }) => {
  return (
    <nav className={styles['footer-navbar']}>
      {Object.values(FooterNavBarLinks).map(({ link, label }, index) => (
        <CustomLink
          key={index}
          to={link}
          ariaLabel={translations[label]}
          className={styles['footer-navbar__link']}
          type={LinkTypes.navLink}
        >
          {translations[label]}
        </CustomLink>
      ))}
    </nav>
  );
};

export default FooterNavBar;