"use client";

import { ReactNode } from "react";
import { ThemeProvider } from 'next-themes';
import { AppProvider } from "@/ui/globalState/AppContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AppProvider>
  );
};

export default Providers;
