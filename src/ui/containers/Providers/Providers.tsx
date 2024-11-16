"use client";

import { ReactNode } from "react";
import { AppProvider } from "@/ui/globalState/AppContext";

const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
};

export default Providers;
