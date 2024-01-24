import React from 'react';
import Icon from '../ui-kit/Icon';
import Logo from '../Logo/Logo';

import styles from './styles/footer.module.scss';
import { Text } from '../ui-kit';
import FooterNavBar from './FooterNavBar/FooterNavBar';

const Footer:React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <Logo />

        <Text
          textType="p"
          className={styles.footer__address}
        >
          7635 Auburn Blvd, Citrus Heights, CA 95610
        </Text>
      </div>
      
      <div className={styles.footer__bottom}>
        <FooterNavBar />
      </div>
    </footer>
  )
}

export default Footer
