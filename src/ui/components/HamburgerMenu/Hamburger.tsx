'use client';

import React from 'react';

import { useClientTranslationFunction } from '@/hooks/useLocale';
import { Icon } from '@/ui/components/ui-kit';

import styles from '././styles/hamburger.module.scss';

interface HamburgerProps {
  toggleMobileMenu: () => void;
  isMenuOpen: boolean;
}

const Hamburger: React.FC<HamburgerProps> = ({ toggleMobileMenu, isMenuOpen }) => {
  const translate = useClientTranslationFunction();

  const ariaLabel = isMenuOpen
    ? translate('aria_label_close_menu')
    : translate('aria_label_navigation_menu');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={styles.hamburger}
      onClick={toggleMobileMenu}
      title={ariaLabel}
    >
      {!isMenuOpen ? (
        <Icon iconName="hamburger" />
      ) : (
        <Icon iconName="cross" className={styles.hamburger__cross} />
      )}
    </div>
  );
};

export default Hamburger;
