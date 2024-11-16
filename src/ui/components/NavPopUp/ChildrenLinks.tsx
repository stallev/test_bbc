import React from "react";
import { CustomLink } from "../ui-kit";
import { LinkTypes } from "@/constants/LinkTypes";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./styles/NavPopUp.module.scss";
interface ChildrenLinksProps {
  childrenLinks: any[];
  translations: Record<string, string>
  handleLinkClick: () => void;
  handleBackClick: () => void;
}

const ChildrenLinks: React.FC<ChildrenLinksProps> = ({
  childrenLinks,
  translations,
  handleLinkClick,
  handleBackClick,
}) => {
  return (
    <div>
      <div className={styles.backButton_div}>
        <div className={styles.backButton} onClick={handleBackClick}>
          <IoIosArrowBack />
          <p>{translations["back_link_label"]}</p>
        </div>
      </div>
      {childrenLinks.map(({ link, label }, index) => (
        <div key={index} className={styles.singleLink_div}>
          <div className={styles.singleLink}>
            <CustomLink
              to={link}
              ariaLabel={translations[label] as string}
              className={styles.navbar__link}
              type={LinkTypes.navLink}
              onCLick={() => handleLinkClick()}
            >
              {translations[label]}
            </CustomLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildrenLinks;
