"use client"

import React from "react";
import { RoutePath } from "@/constants/RoutePath";
import Link from "next/link";
import { Icon } from "@/ui/components/ui-kit";
import { slugSelector } from '@/utils/slugSelector';
import { useLocale } from "@/hooks/useLocale";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
import { useAppContext } from "@/ui/globalState/ContextHook/contextHook";
import { TranslationsType } from "@/types/globalTypes";

import styles from "./styles/logo.module.scss";


const Logo: React.FC<TranslationsType> = ({ translations }) => {
  const { state, dispatch } = useAppContext();
  const locale = useLocale();
  const href = slugSelector(locale, RoutePath.Home);

  const toggleMenuButton = () => {
    state.isMenuOpen && toggleMenu(dispatch);
  };

  return (
    <div className={styles.logo} onClick={toggleMenuButton}>
      <Link prefetch={true} aria-label={translations["site_name"]} href={href} >
        <Icon iconName="logo" />
      </Link>
    </div>
  );
};

export default Logo;
