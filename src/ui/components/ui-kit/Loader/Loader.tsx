import React from 'react';

import styles from './styles/loader.module.scss';

interface LoaderProps {
  isFullScreen?: boolean;
}

const Loader = ({ isFullScreen = false }: LoaderProps) => {
  return (
    <div className={`${styles.loader} ${isFullScreen ? styles['loader--full-screen'] : ''}`}>
      <div className={styles['loader__spinner']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
