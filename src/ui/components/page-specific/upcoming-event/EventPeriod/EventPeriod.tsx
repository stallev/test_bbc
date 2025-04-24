import React from 'react';
import { useRouter } from 'next/router';
import { getShortMonthWithTimeFormattedDate } from '@/utils/dateFormatter';
import { RxCalendar } from "react-icons/rx";
import { Text } from '@/ui/components/ui-kit';
import { EventPeriodProps } from './types';

import styles from './styles/event-period.module.scss';

const EventPeriod:React.FC<EventPeriodProps> = ({
  startTime,
  endTime
}) => {
  const { locale } = useRouter();

  return (
    <div className={styles["event-period"]}>
      <RxCalendar />
      
      <div className={styles["event-period__dates"]}>
        <Text
          textType="span"
          className={styles["event-period__date"]}
        >
          {getShortMonthWithTimeFormattedDate(startTime, locale)}
        </Text>
        -
        <Text
          textType="span"
          className={styles["event-period__date"]}
        >
          {getShortMonthWithTimeFormattedDate(endTime, locale)}
        </Text>
      </div>
    </div>
  )
}

export default EventPeriod;
