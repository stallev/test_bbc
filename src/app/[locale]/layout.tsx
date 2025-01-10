import React from "react";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Header from "@/ui/components/Header/Header";
import Footer from "@/ui/components/Footer/Footer";
import Notification from "@/ui/components/ui-kit/Notification/Notification";
import styles from "@/styles/Home.module.scss";
import Providers from "@/ui/containers/Providers/Providers";
import { getTranslations } from "@/utils/languageParser";
import { Locale } from "@/i18n.config";
import "./global.css";

const Player = dynamic(() => import('@/ui/components/Player/Player'));

const acciaReg = localFont({
  src: "../fonts/AcciaFlareRegular.woff",
  variable: "--font-accia-reg",
  weight: "400",
});

const gilroySemibold = localFont({
  src: "../fonts/GilroySemibold.woff",
  variable: "--font-gilroy-semibold",
  weight: "600",
});

const gilroyMedium = localFont({
  src: "../fonts/GilroyMedium.woff",
  variable: "--font-gilroy-medium",
  weight: "500",
});

const gilroyRegular = localFont({
  src: "../fonts/GilroyRegular.woff",
  variable: "--font-gilroy-regular",
  weight: "400",
});

const ttLivretDisplay = localFont({
  src: "../fonts/TTLivretDisplayTrialLightItalic.woff",
  variable: "--font-livret-display",
  weight: "300",
  style: "italic",
});

const Layout = async ({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) => {
  const translations = getTranslations(locale);

  return (
    <html suppressHydrationWarning={true} lang={locale}>
      <meta
        name="viewport"
        title={translations.site_name}
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <body
        suppressHydrationWarning={true}
        className={`${acciaReg.variable} ${gilroyMedium.variable} ${gilroyRegular.variable} ${ttLivretDisplay.variable} ${gilroySemibold.variable}`}
      >
        <Providers>
          <Header />

          <main className={styles.main}>
            {children}
          </main>

          <Footer
            translations={translations}
            locale={locale}
          />

          <Notification translations={translations} />

          <Player />
        </Providers>
      </body>
    </html>
  );
}

export default Layout;
