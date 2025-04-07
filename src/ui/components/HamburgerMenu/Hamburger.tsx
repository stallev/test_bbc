"use client"

import React from "react";
import styles from "././styles/hamburger.module.scss";
import { IoMenu, IoClose } from "react-icons/io5";

interface HamburgerProps {
  toggleMobileMenu: () => void
  isMenuOpen: boolean
}

const Hamburger: React.FC<HamburgerProps> = ({ toggleMobileMenu, isMenuOpen }) => {
  return (
    <div className={styles.hamburger} onClick={toggleMobileMenu}>
      {!isMenuOpen ? <IoMenu /> : <IoClose />}
    </div>
  );
};

export default Hamburger;
