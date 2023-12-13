import React from "react";
import styles from "././styles/hamburger.module.scss";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";
import { useAppContext } from "../../globalState/ContextHook/contextHook";

const Hamburger: React.FC = () => {
  const { dispatch } = useAppContext();

  const toggleMenuButton = () => {
    toggleMenu(dispatch);
  };

  return (
    <div className={`${styles.hamburger} `} onClick={toggleMenuButton}>
      <div className={`${styles["hamburger-bar"]} bar-1`}></div>
      <div className={`${styles["hamburger-bar"]} bar-2`}></div>
      <div className={`${styles["hamburger-bar"]} bar-3`}></div>
    </div>
  );
};

export default Hamburger;
