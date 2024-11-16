import React from "react";
import Seo from "@/ui/components/Seo/Seo";
import { SeoContentDataProps } from "@/ui/components/Seo/types";
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
