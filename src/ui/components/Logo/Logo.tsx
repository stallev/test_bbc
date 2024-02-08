import React from "react";
import { RoutePath } from "@/constants/RoutePath";
import Link from "next/link";
import { Icon } from "../ui-kit";
import useTranslationFunction from "@/hooks/useTranslationFunction";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
import { useAppContext } from "../../globalState/ContextHook/contextHook";

import styles from "./styles/logo.module.scss";

const Logo: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const translate = useTranslationFunction();

  const toggleMenuButton = () => {
    state.isMenuOpen && toggleMenu(dispatch);
  };

  return (
    <div className={styles.logo} onClick={toggleMenuButton}>
      <Link aria-label={translate("site_name")} href={RoutePath.Home} >
        <Icon iconName="logo" />
      </Link>
    </div>
  );
};

export default Logo;
