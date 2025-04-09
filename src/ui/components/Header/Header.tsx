'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { useLocale } from '@/hooks/useLocale';
import useScrollHandler from '@/hooks/useScrollHandler';
import { MobileMenuStateProps } from '@/types/globalTypes';
import { getTranslations } from '@/utils/languageParser';

import styles from './styles/header.module.scss';
import Hamburger from '../HamburgerMenu/Hamburger';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';

const ThemeSwitcher = dynamic(() => import('@/ui/components/ThemeSwitcher/ThemeSwitcher'), {
  ssr: false,
});

const Header = () => {
  const locale = useLocale();

  const [mobileMenuState, setMobileMenuState] = useState<MobileMenuStateProps>({
    isMenuOpen: false,
    activeDropDownMenuItem: false,
  });

  const toggleMobileMenu = () => {
    setMobileMenuState({
      isMenuOpen: !mobileMenuState.isMenuOpen,
      activeDropDownMenuItem: false,
    });
  };

  const visible = useScrollHandler();

  const translations = getTranslations(locale);

  return (
    <header className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}>
      {mobileMenuState.isMenuOpen && (
        <div onClick={toggleMobileMenu} className={styles.header__overlay}></div>
      )}

      <div className={styles.header__content}>
        <Logo translations={translations} />

        <NavBar setMobileMenuState={setMobileMenuState} mobileMenuState={mobileMenuState} />

        <div className={styles.header__tooglers}>
          <Hamburger toggleMobileMenu={toggleMobileMenu} isMenuOpen={mobileMenuState.isMenuOpen} />

          <ThemeSwitcher />

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
