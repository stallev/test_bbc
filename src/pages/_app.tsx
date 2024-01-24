import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Montserrat } from "next/font/google";
import Layout from '@/ui/containers/Layout/Layout';
import { AppProvider } from '@/ui/globalState/AppContext';

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
      <div className={montserrat.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </AppProvider>
  )
}

export default appWithTranslation(App);
