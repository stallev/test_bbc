import React from "react";
import dynamic from "next/dynamic";
import Header from "@/ui/components/Header/Header";
import BottomNav from "@/ui/components/BottomNav/BottomNav";

import Footer from "@/ui/components/Footer/Footer";
import Notification from "@/ui/components/ui-kit/Notification/Notification";
import { MainNavBarLinks } from "@/constants/NavBarLinks";
import styles from "@/styles/Home.module.scss";
import NavPopUp from "@/ui/components/NavPopUp/NavPopUp";
import Providers from "@/ui/containers/Providers/Providers";
import { getTranslations } from "@/utils/languageParser";
import { i18n, Locale } from "@/i18n.config";
import "./global.css";

const Player = dynamic(() => import('@/ui/components/Player/Player'));

const Layout = async ({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) => {
  const translations = getTranslations(locale);

  return (
    <html lang={locale}>
      <meta
        name="viewport"
        title={translations.site_name}
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <body>
        <Providers>
          <Header />
          
          <NavPopUp
            navBarLinks={MainNavBarLinks}
            translations={translations}
          />

          <main className={styles.main}>{children}</main>
          <Footer
            translations={translations}
            locale={locale}
          />

          <BottomNav />

          <Notification translations={translations} />

          <Player />
        </Providers>
      </body>
    </html>
  );
}

export default Layout;
