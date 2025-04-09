'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { AppProvider } from '@/ui/globalState/AppContext';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppProvider>
  );
};

export default Providers;
