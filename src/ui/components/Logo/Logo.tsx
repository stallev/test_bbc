import React from "react";
import Link from "next/link";
import { RoutePath } from "@/constants/RoutePath";
import { Icon } from "../ui-kit";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
import { useAppContext } from "../../globalState/ContextHook/contextHook";
import styles from "./styles/logo.module.scss";

const Logo: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const toggleMenuButton = () => {
    state.isMenuOpen && toggleMenu(dispatch);
  };

  return (
    <div className={styles.logo} onClick={toggleMenuButton}>
      {/* <CustomLink
        className={styles.logo__link}
        to={RoutePath.Home}
      >
        
      </CustomLink> */}
      <Link href={RoutePath.Home} >
        <Icon className={styles.logo__icon} iconName="logo" />
      </Link>
    </div>
  );
};

export default Logo;
