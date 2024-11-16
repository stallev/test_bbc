import React from "react";
import CustomLink from "../ui-kit/CustomLink";
import Text from "../ui-kit/Text";
import { MainNavBarLinks } from "@/constants/NavBarLinks";
import { LinkTypes } from "@/constants/LinkTypes";
import styles from "./styles/navbar.module.scss";
import NavDropDown from "../NavDropDown/NavDropDown";
import useDropdown from "@/hooks/useDropDown";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface NavBarProps {
  translations: Record<string, string>
}

const NavBar: React.FC<NavBarProps> = ({ translations }) => {
  const { activeDropdown, handleMouseEnter, handleMouseLeave } = useDropdown();

  return (
    <nav className={styles.navbar}>
      {Object.values(MainNavBarLinks).map(
        ({ link, label, children }, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(label)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.link_div}>
              {
                !!link ? (
                  <CustomLink
                    to={link}
                    ariaLabel={translations[label] as string}
                    className={styles.navbar__link}
                    type={LinkTypes.navLink}
                  >
                    {translations[label]}
                  </CustomLink>
                ) : (
                  <Text
                    textType="span"
                    className={styles.navbar__link}
                  >
                    {translations[label]}
                  </Text>
                )
              }
              
              <div className={styles.arrowIcon}>
                {Object.keys(children).length > 0 &&
                  (activeDropdown === label ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  ))}
              </div>
            </div>
            {activeDropdown === label && Object.keys(children).length > 0 && (
              <NavDropDown childrenLinks={children} translations={translations} />
            )}
          </div>
        )
      )}
    </nav>
  );
};

export default NavBar;
