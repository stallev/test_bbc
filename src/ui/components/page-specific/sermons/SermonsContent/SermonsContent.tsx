import React from 'react';
import SermonCardsList from '../SermonCardsList/SermonCardsList';
import SermonFilters from '../SermonsFilters/SermonFilters';
import { SermonsContentProps } from './types';

import styles from './styles/sermons-content.module.scss';

const SermonsContent:React.FC<SermonsContentProps> = ({ sermonsData, sermonsCategories }) => {
  return (
    <div className={styles["sermons-content"]}>
      <SermonFilters data={sermonsCategories} />
      
      <SermonCardsList data={sermonsData} />
    </div>
  )
}

export default SermonsContent;
