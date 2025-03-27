import React from "react";
// import dynamic from "next/dynamic";
import Header from "@/ui/components/Header/Header";
// import Footer from "@/ui/components/Footer/Footer";
// import Notification from "@/ui/components/ui-kit/Notification/Notification";
import styles from "@/styles/Home.module.scss";
import Providers from "@/ui/containers/Providers/Providers";
import { getTranslations } from "@/utils/languageParser";
import { Locale } from "@/i18n.config";
import "./global.css";

// const Player = dynamic(() => import('@/ui/components/Player/Player'));

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
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />

          <main className={styles.main}>
            {children}
          </main>

          {/* <Footer
            translations={translations}
            locale={locale}
          />

          <Notification translations={translations} />

          <Player /> */}
        </Providers>
      </body>
    </html>
  );
}

export default Layout;
