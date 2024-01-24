import React, { useEffect } from "react";
import styles from "././styles/hamburger.module.scss";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
import { useAppContext } from "../../globalState/ContextHook/contextHook";
import { IoMenu, IoClose } from "react-icons/io5";

const Hamburger: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const toggleMenuButton = () => {
    toggleMenu(dispatch);
  };

  return (
    <div className={styles.hamburger} onClick={toggleMenuButton}>
      {!state.isMenuOpen ? <IoMenu /> : <IoClose />}
    </div>
  );
};

export default Hamburger;
