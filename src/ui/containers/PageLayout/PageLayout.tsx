import React from "react";
import { SeoContentDataProps } from "@/types/globalTypes";
import { SeoPagePathDataProps } from "@/types/globalTypes";

interface PageLayoutProps {
  seoData: SeoContentDataProps
  seoPathData: SeoPagePathDataProps
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, seoData, seoPathData }) => {

  return (
    <>
      {children}
    </>
  );
};

export default PageLayout;
