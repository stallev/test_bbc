'use client';

import React, { useRef } from 'react';

import { useOnceIntersection } from '@/hooks/useOnceIntersection';
import UpcomingEventCard from '@/ui/components/page-specific/upcoming-event/UpcomingEventCard/UpcomingEventCard';

import { UpcomingEventCardItemProps } from '../UpcomingEventCard/types';
import styles from './styles/upcoming-events-list.module.scss';

const UpcomingEventsList = ({
  data,
  isLandingPage = false,
}: {
  data: UpcomingEventCardItemProps[];
  isLandingPage?: boolean;
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimated = useOnceIntersection(listRef);

  if (!data.length) {
    return <p>No upcoming events data</p>;
  }

  return (
    <div
      ref={listRef}
      className={`${styles['upcoming-events-list']} ${isAnimated ? styles.animated : ''}`}
    >
      {data.map(item => (
        <UpcomingEventCard key={item.slug} data={item} isLandingPage={isLandingPage} />
      ))}
    </div>
  );
};

export default UpcomingEventsList;
