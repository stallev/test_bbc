'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5';

import { LinkTypes } from '@/constants/LinkTypes';
import { MainNavBarLinks } from '@/constants/NavBarLinks';
import useDropdown from '@/hooks/useDropDown';
import { useClientTranslationFunction, useLocale } from '@/hooks/useLocale';

import Hamburger from '@/ui/components/HamburgerMenu/Hamburger';
import LanguageSwitcher from '@/ui/components/LanguageSwitcher/LanguageSwitcher';
import Logo from '@/ui/components/Logo/Logo';
import ThemeSwitcher from '@/ui/components/ThemeSwitcher/ThemeSwitcher';
import { slugSelector } from '@/utils/slugSelector';
import { NavBarProps } from './types';
import { CustomLink, Text, Icon } from '../ui-kit';

import styles from './styles/navbar.module.scss';

const NavBar = ({ setMobileMenuState, mobileMenuState, toggleMobileMenu }: NavBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const { handleMouseEnter, handleMouseLeave, handleClick } = useDropdown({
    setMobileMenuState,
    mobileMenuState,
  });
  const { isMenuOpen, activeDropDownMenuItem } = mobileMenuState;
  const translate = useClientTranslationFunction();

  useEffect(() => {
    setMobileMenuState({
      isMenuOpen: false,
      activeDropDownMenuItem: false,
    });
  }, [pathname, setMobileMenuState]);

  useEffect(() => {
    const prefetchSubmenuLinks = async () => {
      const submenuLinks = MainNavBarLinks.filter(({ children }) => children?.length > 0);

      for (const parentLink of submenuLinks) {
        if (parentLink.children && parentLink.children.length > 0) {
          for (const childLink of parentLink.children) {
            try {
              const localizedPath = slugSelector(locale, childLink.link);
              router.prefetch(localizedPath);
            } catch (error) {
              console.error('Error prefetching:', childLink.link, error);
            }
          }
        }
      }
    };

    if (isMenuOpen) {
      prefetchSubmenuLinks();
    }
  }, [pathname, router, locale, isMenuOpen]);

  return (
    <div className={`${styles.navbar} ${isMenuOpen ? styles['navbar--show'] : ''}`}>
      {isMenuOpen && (
        <div className={styles.navbar__header}>
          <Logo ariaLabel={translate('site_name')} />
          <Hamburger toggleMobileMenu={toggleMobileMenu} isMenuOpen={isMenuOpen} />
        </div>
      )}

      <nav className={styles.navbar__content}>
        {MainNavBarLinks.map(({ link, label, children, iconName }, index) => (
          <div key={index} onMouseLeave={handleMouseLeave} className={styles.navbar__item}>
            {!children?.length ? (
              <CustomLink
                to={link}
                ariaLabel={translate(label) as string}
                className={`${styles.navbar__link} ${
                  iconName ? styles['navbar__link--outlined'] : ''
                }`}
                type={LinkTypes.navLink}
              >
                {iconName ? (
                  <>
                    <Icon iconName={iconName} />
                    <span>{translate(label)}</span>
                  </>
                ) : (
                  translate(label)
                )}
              </CustomLink>
            ) : (
              <>
                <div
                  className={styles.navbar__label}
                  onClick={() => handleClick({ link, label, children })}
                  onMouseEnter={() => handleMouseEnter({ link, label, children })}
                >
                  <Text textType="span" className={styles.navbar__link}>
                    {translate(label)}
                  </Text>

                  <div className={styles.arrowIcon}>
                    {children.length > 0 &&
                      (!!activeDropDownMenuItem && activeDropDownMenuItem.label === label ? (
                        <IoCaretUpSharp />
                      ) : (
                        <IoCaretDownSharp />
                      ))}
                  </div>
                </div>

                <div
                  className={`
                  ${styles.navbar__submenu} ${!!activeDropDownMenuItem && activeDropDownMenuItem.label === label ? styles['navbar__submenu--active'] : ''}
                `}
                >
                  {children.map(({ link, label }, index) => (
                    <CustomLink
                      key={index}
                      ariaLabel={translate(label) as string}
                      to={link}
                      className={styles['navbar__submenu-link']}
                      type={LinkTypes.navLink}
                    >
                      {translate(label)}
                    </CustomLink>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </nav>

      {isMenuOpen && (
        <div className={styles.navbar__footer}>
          <ThemeSwitcher />

          <LanguageSwitcher />
        </div>
      )}
    </div>
  );
};

export default NavBar;
