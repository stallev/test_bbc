import cx from 'classnames';
import React from 'react';

import { LinkTypes } from '@/constants/LinkTypes';
import { MainNavBarLinks } from '@/constants/NavBarLinks';

import { CustomLink } from '../../ui-kit';
interface Props {
  mainDiv?: any;
  secondDiv?: any;
  linkStyle?: any;
}

const CustomNav: React.FC<Props> = ({ mainDiv, secondDiv, linkStyle }) => {
  return (
    <div className={cx(mainDiv)}>
      <div className={secondDiv}>
        {Object.values(MainNavBarLinks).map(({ link, label }, index) => (
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
