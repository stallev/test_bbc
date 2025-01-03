"use client";

import { ReactNode } from "react";
import { ThemeProvider } from 'next-themes';
import { APIProvider } from '@vis.gl/react-google-maps';
import { AppProvider } from "@/ui/globalState/AppContext";
import { GENERAL_GOOGLE_API_KEY } from "@/constants/APIs";

const libraries = ['geometry', 'places'];

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <APIProvider apiKey={GENERAL_GOOGLE_API_KEY} libraries={libraries}>
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </APIProvider>
    </AppProvider>
  );
};

export default Providers;
