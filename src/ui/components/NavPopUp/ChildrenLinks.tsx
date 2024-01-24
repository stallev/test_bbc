import React from "react";
import { CustomLink } from "../ui-kit";
import { LinkTypes } from "@/constants/LinkTypes";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./styles/NavPopUp.module.scss";
interface ChildrenLinksProps {
  childrenLinks: any[];
  translate: (term: string) => React.ReactNode;
  handleLinkClick: (label: string) => void;
  handleBackClick: () => void;
}

const ChildrenLinks: React.FC<ChildrenLinksProps> = ({
  childrenLinks,
  translate,
  handleLinkClick,
  handleBackClick,
}) => {
  return (
    <div>
      <div className={styles.backButton_div}>
        <div className={styles.backButton} onClick={handleBackClick}>
          <IoIosArrowBack />
          <p>Back</p>
        </div>
      </div>
      {childrenLinks.map(({ link, label }, index) => (
        <div key={index} className={styles.singleLink_div}>
          <div className={styles.singleLink}>
            <CustomLink
              to={link}
              ariaLabel={translate(label) as string}
              className={styles.navbar__link}
              type={LinkTypes.navLink}
              onCLick={() => handleLinkClick(label)}
            >
              {translate(label)}
            </CustomLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildrenLinks;
