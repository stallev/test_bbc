import dynamic from 'next/dynamic';
import React from 'react';

import { Locale } from '@/i18n.config';
import styles from '@/styles/Home.module.scss';
import Footer from '@/ui/components/Footer/Footer';
import Header from '@/ui/components/Header/Header';
import Notification from '@/ui/components/ui-kit/Notification/Notification';
import Providers from '@/ui/containers/Providers/Providers';
import { getTranslations } from '@/utils/languageParser';

const Player = dynamic(() => import('@/ui/components/Player/Player'));

const Layout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) => {
  const translations = getTranslations(locale);

  return (
    <Providers>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer translations={translations} locale={locale} />

      <Notification translations={translations} />

      <Player />
    </Providers>
  );
};

export default Layout;
