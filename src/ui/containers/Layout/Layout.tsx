import React from "react";
import { Inter } from "next/font/google";
import useTranslationFunction from '@/hooks/useTranslationFunction';
import Header from "@/ui/components/Header/Header";
import BottomNav from "@/ui/components/BottomNav/BottomNav";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  isMobileWindowSize,
  isSmallWindowSize,
} from "@/hooks/useWindowSizeType";
import { useAppContext } from "@/ui/globalState/ContextHook/contextHook";
import NavPopUp from "@/ui/components/NavPopUp/NavPopUp";

import styles from "@/styles/Home.module.scss";

const roboto = Inter({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const translate = useTranslationFunction();

  const windowsize = useWindowDimensions();
  const isPhone = isMobileWindowSize(windowsize.width);
  const tabletSize = isSmallWindowSize(windowsize.width);
  const { state } = useAppContext();

  return (
    <>
      <Header translate={translate} />
      {state.isMenuOpen && tabletSize && <NavPopUp />}

      <main className={`${styles.main} ${roboto.className}`}>{children}</main>
      {isPhone && <BottomNav />}
    </>
  );
};

export default Layout;
