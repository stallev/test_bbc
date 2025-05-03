import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

import { Locale } from '@/i18n.config';
import styles from '@/styles/Home.module.scss';
import Header from '@/ui/components/Header/Header';
import ClientPlayer from '@/ui/components/Player/ClientPlayer';
import Loader from '@/ui/components/ui-kit/Loader/Loader';
import ClientNotification from '@/ui/components/ui-kit/Notification/ClientNotification';
import Providers from '@/ui/containers/Providers/Providers';
import { getTranslations } from '@/utils/languageParser';

// Отложенная загрузка неприоритетных компонентов
const Footer = dynamic(() => import('@/ui/components/Footer/Footer'), { ssr: true });

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

      <Footer translations={translations} locale={locale} />

      <Suspense fallback={<Loader />}>
        <ClientNotification translations={translations} />
      </Suspense>

      <Suspense fallback={null}>
        <ClientPlayer />
      </Suspense>
    </Providers>
  );
};

export default Layout;
