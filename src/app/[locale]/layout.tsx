import React from 'react';

import { Locale } from '@/i18n.config';
import styles from '@/styles/Home.module.scss';
import ClientFooter from '@/ui/components/Footer/ClientFooter';
import Header from '@/ui/components/Header/Header';
import LazyLoader from '@/ui/components/LazyLoader/LazyLoader';
import ClientPlayer from '@/ui/components/Player/ClientPlayer';
import ClientNotification from '@/ui/components/ui-kit/Notification/ClientNotification';
import Providers from '@/ui/containers/Providers/Providers';
import { getTranslations } from '@/utils/languageParser';

const Layout = async (props: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) => {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  const translations = getTranslations(locale);

  return (
    <Providers>
      <Header />

      <main className={styles.main}>{children}</main>

      <LazyLoader>
        <ClientFooter translations={translations} locale={locale} />

        <ClientNotification translations={translations} />

        <ClientPlayer />
      </LazyLoader>
    </Providers>
  );
};

export default Layout;
