import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Montserrat } from "next/font/google";
import { AppProvider } from '@/ui/globalState/AppContext';
import DefaultSeoData from '../../next-seo.config';

import '@/styles/globals.css'

const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <DefaultSeo {...DefaultSeoData} />
      
      <div className={montserrat.className}>
        <Component {...pageProps} />
      </div>
    </AppProvider>
  )
}

export default appWithTranslation(App);
