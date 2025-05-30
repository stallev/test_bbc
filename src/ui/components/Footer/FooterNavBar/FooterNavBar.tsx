import React from 'react';

import { FooterNavBarGeneralLinks } from '@/constants/FooterNavBar';
import { LinkTypes } from '@/constants/LinkTypes';
import { NavBarMinistryLinks } from '@/constants/NavBarLinks';
import { TranslationsType } from '@/types/globalTypes';

import { CustomLink } from '../../ui-kit';
import styles from './styles/footer-navbar.module.scss';

const FooterNavBar: React.FC<TranslationsType> = ({ translations }) => {
  return (
    <div className={styles['footer-navbar']}>
      <nav className={styles['footer-navbar__ministry']}>
        {NavBarMinistryLinks.map(({ link, label }, index) => (
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

      <nav className={styles['footer-navbar__general']}>
        {FooterNavBarGeneralLinks.map(({ link, label }, index) => (
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
    </div>
  );
};

export default FooterNavBar;
