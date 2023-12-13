import React from 'react';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import NavBar from '../NavBar/NavBar';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Logo from '../Logo/Logo';
import Hamburger from "../HamburgerMenu/Hamburger";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  isSmallWindowSize,
  isMobileWindowSize,
} from "@/hooks/useWindowSizeType";

import styles from './styles/header.module.scss';

interface HeaderProps {
  translate: (term: string) => React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ translate }) => {
  const t = useTranslationFunction();
  const windowsize = useWindowDimensions();
  const isSmallWindow = isSmallWindowSize(windowsize.width);
  const isPhone = isMobileWindowSize(windowsize.width);
  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <Logo />
        
        <NavBar translate={translate} />

        <div className={styles.header__tooglers}>
          <LanguageSwitcher />

          {isSmallWindow && !isPhone && <Hamburger />}
        </div>
      </div>
    </div>  
  );
};

export default Header;
