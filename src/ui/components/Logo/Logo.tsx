import React from "react";
import { RoutePath } from "@/constants/RoutePath";
import { CustomLink, Icon } from "../ui-kit";
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
    <div className={styles.logo}>
      <CustomLink
        className={styles.logo__link}
        to={RoutePath.Home}
        onCLick={toggleMenuButton}
        ariaLabel={translate("site_name")}
      >
        <Icon className={styles.logo__icon} iconName="logo" />
      </CustomLink>
    </div>
  );
};

export default Logo;
