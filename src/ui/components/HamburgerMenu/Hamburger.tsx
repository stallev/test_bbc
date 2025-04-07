"use client"

import React from "react";
import styles from "././styles/hamburger.module.scss";
import { Icon } from "../ui-kit";

interface HamburgerProps {
  toggleMobileMenu: () => void
  isMenuOpen: boolean
}

const Hamburger: React.FC<HamburgerProps> = ({ toggleMobileMenu, isMenuOpen }) => {
  return (
    <div role="button" tabIndex={0} aria-label="navigation menu" className={styles.hamburger} onClick={toggleMobileMenu}>
      {!isMenuOpen ? <Icon iconName="hamburger" /> : <Icon iconName="cross" />}
    </div>
  );
};

export default Hamburger;
