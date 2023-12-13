import React from "react";
import { CustomLink } from "../../ui-kit";
import { NavBarLinks } from "@/constants/NavBarLinks";
import { LinkTypes } from "@/constants/LinkTypes";
import cx from "classnames";
interface Props {
  mainDiv?: any;
  secondDiv?: any;
  linkStyle?: any;
}

const CustomNav: React.FC<Props> = ({ mainDiv, secondDiv, linkStyle }) => {
  return (
    <div className={cx(mainDiv)}>
      <div className={secondDiv}>
        {Object.values(NavBarLinks).map(({ link, label }, index) => (
          <CustomLink
            key={index}
            to={link}
            label={label}
            className={linkStyle}
            type={LinkTypes.navLink}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomNav;
