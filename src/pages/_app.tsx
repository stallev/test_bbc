import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'
import Layout from '@/ui/containers/Layout/Layout';
import { AppProvider } from '@/ui/globalState/AppContext';

import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default appWithTranslation(App);
