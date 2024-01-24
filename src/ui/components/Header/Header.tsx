import React from "react";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import NavBar from "../NavBar/NavBar";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import Logo from "../Logo/Logo";
import Hamburger from "../HamburgerMenu/Hamburger";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  isSmallWindowSize,
  isMobileWindowSize,
} from "@/hooks/useWindowSizeType";
import styles from "./styles/header.module.scss";
import useScrollHandler from "@/hooks/useScrollHandler";
interface HeaderProps {
  translate: (term: string) => React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ translate }) => {
  const t = useTranslationFunction();

  const windowsize = useWindowDimensions();
  const isSmallWindow = isSmallWindowSize(windowsize.width);
  const isPhone = isMobileWindowSize(windowsize.width);
  const visible = useScrollHandler();

  return (
    <header
      className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.header__content}>
        <Logo />

        <NavBar translate={translate} />

        <div className={styles.header__tooglers}>
          <LanguageSwitcher />

          {isSmallWindow && !isPhone && <Hamburger />}
        </div>
      </div>
    </header>
  );
};

export default Header;
