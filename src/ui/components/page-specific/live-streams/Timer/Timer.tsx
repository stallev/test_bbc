'use client';

import React from 'react';

import { useClientTranslationFunction } from '@/hooks/useLocale';

import styles from './styles/timer.module.scss';

interface TimerProps {
  data: {
    daysCount: number;
    hoursCount: number;
    minutesCount: number;
    secondsCount: number;
    totalMillisecondsCount: number;
  };
}

const Timer: React.FC<TimerProps> = ({ data }: TimerProps) => {
  const translate = useClientTranslationFunction();

  return (
    <div className={styles.timer}>
      <div className={styles['timer__time-items']}>
        <div className={styles['timer__time-item']}>
          <span className={styles['timer__time-item-value']}>{data?.daysCount}</span>
          <span className={styles['timer__time-item-unit']}>
            {data?.daysCount > 1 ? translate('stream_days') : translate('stream_day')}
          </span>
        </div>

        <span className={styles['timer__separator']}>/</span>

        <div className={styles['timer__time-item']}>
          <span className={styles['timer__time-item-value']}>{data?.hoursCount}</span>
          <span className={styles['timer__time-item-unit']}>
            {data?.hoursCount > 1 ? translate('stream_hours') : translate('stream_hour')}
          </span>
        </div>

        <span className={styles['timer__separator']}>/</span>

        <div className={styles['timer__time-item']}>
          <span className={styles['timer__time-item-value']}>{data?.minutesCount}</span>
          <span className={styles['timer__time-item-unit']}>
            {data?.minutesCount > 1 ? translate('stream_minutes') : translate('stream_minute')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
