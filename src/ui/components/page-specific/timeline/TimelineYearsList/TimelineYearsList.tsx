import React from 'react';
import TimelineYear from '../TimelineYear/TimelineYear';
import { TimelineYearsListProps } from '../types';

import styles from './styles/timeline-year-list.module.scss';

const TimelineYearsList:React.FC<TimelineYearsListProps> = ({
  data
}) => {
  const yearsList = data.map((item, index) => 
    <TimelineYear
      key={index}
      year={item.year}
      eventsList={item.eventsList}
    />
  );
  return (
    <div className={styles["timeline-year-list"]}>
      {yearsList}
    </div>
  )
}

export default TimelineYearsList;
