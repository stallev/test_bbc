import React from "react";
import { CustomLink } from "../ui-kit";
import { MainNavBarLinks } from "@/constants/NavBarLinks";
import { LinkTypes } from "@/constants/LinkTypes";
import styles from "./styles/navbar.module.scss";
import NavDropDown from "../NavDropDown/NavDropDown";
import useDropdown from "../../../hooks/useDropDown"; // Adjust the path based on your file structure
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface NavBarProps {
  translate: (term: string) => React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ translate }) => {
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
              <CustomLink
                to={link}
                ariaLabel={translate(label) as string}
                className={styles.navbar__link}
                type={LinkTypes.navLink}
              >
                {translate(label)}
              </CustomLink>
              <div className={styles.arrowIcon}>
                {Object.keys(children).length > 0 &&
                  (activeDropdown === label ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  ))}
              </div>
            </div>
            {activeDropdown === label && (
              <NavDropDown childrenLinks={children} translate={translate} />
            )}
          </div>
        )
      )}
    </nav>
  );
};

export default NavBar;
