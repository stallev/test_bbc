import React from 'react';

import styles from './styles/loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
