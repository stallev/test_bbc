import React from 'react';
import { RoutePath } from '@/constants/RoutePath';
import { CustomLink, CustomImage } from '../ui-kit';

import styles from './styles/logo.module.scss';


const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <CustomLink
        className={styles.logo__link}
        to={RoutePath.Home}
      >
        <CustomImage
          className={styles.logo__image}
          imageName="logoHeader"
          alt="logo image"
          ariaLabel='Logo image'
          priority
          sizes='190px'
        />
      </CustomLink>
    </div>
  )
};

export default Logo;
