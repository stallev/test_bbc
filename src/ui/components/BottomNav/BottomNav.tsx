"use client";
import React from "react";
import Hamburger from "../HamburgerMenu/Hamburger";
import styles from "./styles/BottomNav.module.scss";

const BottomNav: React.FC = () => {
  return (
    <div className={styles.mobileMenuDesign}>
      <Hamburger />
    </div>
  );
};

export default BottomNav;
