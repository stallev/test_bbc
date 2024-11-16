import React from "react";
import { CustomLink } from "../ui-kit";
import { LinkTypes } from "@/constants/LinkTypes";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./styles/NavPopUp.module.scss";

interface NavBarLinks {
  [key: string]: {
    link: string;
    label: string;
    children?: Record<string, { link: string; label: string }>;
  };
}

interface ParentLinksProps {
  parentLinks: NavBarLinks;
  translations: Record<string, string>
  handleLinkClick: (label: string) => void;
  handleDropdownClick: (children: any) => void;
}

const ParentLinks: React.FC<ParentLinksProps> = ({
  parentLinks,
  handleLinkClick,
  translations,
  handleDropdownClick,
}) => {
  return (
    <div>
      {Object.values(parentLinks).map(({ link, label, children }, index) => (
        <div key={index} className={styles.singleLink_div}>
          <div className={styles.singleLink}>
            <CustomLink
              to={link}
              ariaLabel={translations[label] as string}
              className={styles.navbar__link}
              type={LinkTypes.navLink}
              onCLick={() => handleLinkClick(label)}
            >
              {translations[label]}
            </CustomLink>
            {Object.keys(children!).length > 0 && (
              <div
                onClick={() => handleDropdownClick(children)}
                className={styles.arrowIcon}
              >
                <IoIosArrowForward />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentLinks;
