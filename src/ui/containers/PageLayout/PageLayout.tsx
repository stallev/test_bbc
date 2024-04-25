import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import Header from "@/ui/components/Header/Header";
import BottomNav from "@/ui/components/BottomNav/BottomNav";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  isMobileWindowSize,
  isSmallWindowSize,
} from "@/hooks/useWindowSizeType";
import { useAppContext } from "@/ui/globalState/ContextHook/contextHook";
import Seo from "@/ui/components/Seo/Seo";
import { SeoProps, SeoContentDataProps } from "@/ui/components/Seo/types";
import Footer from "@/ui/components/Footer/Footer";
import Notification from "@/ui/components/ui-kit/Notification/Notification";
import { MainNavBarLinks } from "@/constants/NavBarLinks";
import styles from "@/styles/Home.module.scss";
import NavPopUp from "@/ui/components/NavPopUp/NavPopUp";

interface PageLayoutProps {
  seoData: SeoContentDataProps
  children: React.ReactNode;
}

const Player = dynamic(() => import('../../components/Player/Player'));

const PageLayout: React.FC<PageLayoutProps> = ({ children, seoData }) => {
  const translate = useTranslationFunction();

  const windowsize = useWindowDimensions();
  const isPhone = isMobileWindowSize(windowsize.width);
  const tabletSize = isSmallWindowSize(windowsize.width);
  const { state } = useAppContext();

  return (
    <>
      <Head>
        <title>{translate("site_name")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Seo seoValues={seoData}/>

      <Header translate={translate} />
      {state.isMenuOpen && tabletSize && (
        <NavPopUp navBarLinks={MainNavBarLinks} />
      )}

      <main className={styles.main}>{children}</main>
      <Footer />
      {isPhone && <BottomNav />}
      <Notification />

      {
        state.playerData.isVisiblePlayer && 
          <Player
            trackName={state.playerData.trackName}
            trackSrc={state.playerData.trackSrc}
          />
      }
    </>
  );
};

export default PageLayout;
