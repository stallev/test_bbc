"use client";

import React from "react";
import Hamburger from "../HamburgerMenu/Hamburger";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { isMobileWindowSize } from "@/hooks/useWindowSizeType";

import styles from "./styles/BottomNav.module.scss";

const BottomNav: React.FC = () => {
  const windowsize = useWindowDimensions();
  const isPhone = isMobileWindowSize(windowsize.width);

  return (
    isPhone && 
      <div className={styles.mobileMenuDesign}>
        <Hamburger />
      </div>
  );
};

export default BottomNav;
