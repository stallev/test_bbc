import React from 'react';

import TimelineEvent from '../TimelineEvent/TimelineEvent';
import { TimelineYearProps } from '../types';
import styles from './styles/timeline-year.module.scss';

const TimelineYear: React.FC<TimelineYearProps> = ({ year, eventsList }) => {
  const events = eventsList.map(event => {
    return (
      <TimelineEvent
        key={event.slug}
        excerpt={event.excerpt}
        featuredImage={event.featuredImage}
        timelineEventDate={event.timelineEventDate}
        title={event.title}
        slug={event.slug}
      />
    );
  });
  return (
    <div className={styles['timeline-year']}>
      <h2 className={styles['timeline-year__year-number']}>{year}</h2>

      <div className={styles['timeline-year__events-list']}>{!!events.length && events}</div>
    </div>
  );
};

export default TimelineYear;
