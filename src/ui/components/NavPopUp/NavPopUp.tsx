import React from "react";
import styles from "./styles/NavPopUp.module.scss";
import { CustomLink } from "../ui-kit";
import { NavBarLinks } from "@/constants/NavBarLinks";
import { LinkTypes } from "@/constants/LinkTypes";
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { useAppContext } from "../../globalState/ContextHook/contextHook";
import { toggleMenu } from "@/ui/globalState/GlobalFunctions/useGlobalFunctions";

const NavPopUp: React.FC = () => {
  const { dispatch } = useAppContext();

  const translate = useTranslationFunction();

  const handleClose = () => {
    toggleMenu(dispatch);
  };

  return (
    <div className={`${styles.navPopUp}`}>
      <div className={styles.popUpLinks}>
        {Object.values(NavBarLinks).map(({ link, label }, index) => (
          <CustomLink
            key={index}
            to={link}
            ariaLabel={translate(label) as string}
            className={styles.navbar__link}
            type={LinkTypes.navLink}
          >
            {translate(label)}
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

export default NavPopUp;
