"use client"

import React from "react";
import NavBar from "../NavBar/NavBar";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Logo from "../Logo/Logo";
import Hamburger from "../HamburgerMenu/Hamburger";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useLocale } from "@/hooks/useLocale";
import {
  isSmallWindowSize,
  isMobileWindowSize,
} from "@/hooks/useWindowSizeType";
import { getTranslations } from "@/utils/languageParser";
import styles from "./styles/header.module.scss";
import useScrollHandler from "@/hooks/useScrollHandler";


const Header: React.FC = () => {
  const locale = useLocale()
  const windowsize = useWindowDimensions();
  const isSmallWindow = isSmallWindowSize(windowsize.width);
  const isPhone = isMobileWindowSize(windowsize.width);
  const visible = useScrollHandler();

  const translations = getTranslations(locale);

  return (
    <header
      className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.header__content}>
        <Logo translations={translations} />

        <NavBar translations={translations} />

        <div className={styles.header__tooglers}>
          <LanguageSwitcher />

          {isSmallWindow && !isPhone && <Hamburger />}
        </div>
      </div>
    </header>
  );
};

export default Header;
