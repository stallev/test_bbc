import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { IoCaretDownSharp, IoCaretUpSharp } from 'react-icons/io5';

import { LinkTypes } from '@/constants/LinkTypes';
import { MainNavBarLinks } from '@/constants/NavBarLinks';
import useDropdown from '@/hooks/useDropDown';
import { useClientTranslationFunction } from '@/hooks/useLocale';
import { MobileMenuStateProps } from '@/types/globalTypes';

import { Text, Icon } from '../ui-kit';
import CustomLink from '../ui-kit/CustomLink';
import styles from './styles/navbar.module.scss';

interface NavBarProps {
  setMobileMenuState: React.Dispatch<React.SetStateAction<MobileMenuStateProps>>;
  mobileMenuState: MobileMenuStateProps;
}

const NavBar: React.FC<NavBarProps> = ({ setMobileMenuState, mobileMenuState }) => {
  const pathname = usePathname();

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

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles['navbar--show'] : ''}`}>
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
              >
                <Text
                  textType="span"
                  className={styles.navbar__link}
                  onHover={() => handleMouseEnter({ link, label, children })}
                >
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

              {!!activeDropDownMenuItem && activeDropDownMenuItem.label === label && (
                <div className={styles.navbar__submenu}>
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
              )}
            </>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
