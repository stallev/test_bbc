import { Text } from '@/ui/components/ui-kit';
import { getDayMonthYearTimeFormattedDate } from '@/utils/dateFormatter';

import styles from './styles/event-period.module.scss';
import { EventPeriodProps } from './types';

const EventPeriod: React.FC<EventPeriodProps> = ({ startTime, endTime, locale }) => {
  const { date: startTimeDate, time: startTimeTime } = getDayMonthYearTimeFormattedDate(
    startTime,
    locale
  );
  const { date: endTimeDate, time: endTimeTime } = getDayMonthYearTimeFormattedDate(
    endTime,
    locale
  );

  const isOneDayEvent =
    new Date(startTimeDate).getMonth() === new Date(endTimeDate).getMonth() &&
    new Date(startTimeDate).getUTCHours() === new Date(endTimeDate).getUTCHours();

  return (
    <div
      className={`${styles['event-period']} ${
        isOneDayEvent ? styles['event-period--one-day'] : ''
      }`}
    >
      {!isOneDayEvent ? (
        <>
          <div className={styles['event-period__date']}>
            <Text textType="span" className={styles['event-period__date-value']}>
              {startTimeDate}
            </Text>
            <Text textType="span" className={styles['event-period__time-value']}>
              {startTimeTime}
            </Text>
          </div>
          &mdash;
          <div className={styles['event-period__date']}>
            <Text textType="span" className={styles['event-period__date-value']}>
              {endTimeDate}
            </Text>
            <Text textType="span" className={styles['event-period__time-value']}>
              {endTimeTime}
            </Text>
          </div>
        </>
      ) : (
        <>
          <div className={styles['event-period__date']}>
            <Text textType="span" className={styles['event-period__date-value']}>
              {startTimeDate}
            </Text>
            <Text textType="span" className={styles['event-period__time-value']}>
              {startTimeTime}&nbsp; &mdash; &nbsp;{endTimeTime}
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

export default EventPeriod;
