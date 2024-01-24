import React, { useEffect, useState } from 'react';
import { convertMillisecondsToTimeData, getServiceTimeDifference } from '@/hooks/useTimerData';
import { RegularLiveStreamsEventsData } from '@/constants/TimerData';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { EventTimerData } from '@/hooks/useTimerData';
import { Text } from '@/ui/components/ui-kit';
import YouTubeCurrentLiveStream from '../YouTubeCurrentLiveStream/YouTubeCurrentLiveStream';
import { YouTubeLiveStreamsUrls } from '@/constants';
import Timer from '../Timer/Timer';

import styles from './styles/live-stream.module.scss';

const LiveStream:React.FC = () => {
  const [timerData, setTimerData] = useState<EventTimerData>({
    start: {
      daysCount: 0,
      hoursCount: 0,
      minutesCount: 0,
      secondsCount: 0,
      totalMillisecondsCount: 0,
    },
    end: {
      daysCount: 0,
      hoursCount: 0,
      minutesCount: 0,
      secondsCount: 0,
      totalMillisecondsCount: 0,
    },
    eventName: '',
  });

  const translate = useTranslationFunction();

  const isLiveStreamVisible = timerData.start.totalMillisecondsCount < 0;

  const sortedEventsArray = RegularLiveStreamsEventsData.sort( (a, b) =>
    getServiceTimeDifference(a).totalMillisecondsCount.endServiceTimeDifference
     - getServiceTimeDifference(b).totalMillisecondsCount.endServiceTimeDifference );

  useEffect(() => {
    const getTimedData = setInterval(() => {
      const eventData = getServiceTimeDifference(sortedEventsArray[0])

      setTimerData(convertMillisecondsToTimeData(eventData))
    }, 1000);
    
    return () => {
      clearInterval(getTimedData);
    };
  }, [sortedEventsArray]);

  return (
    <div className={styles['live-stream']}>
      {!isLiveStreamVisible && <Text
        textType='p'
        className={styles['live-stream__service-description']}
      >
        {translate("stream_description")}
      </Text>}
      
      <Text
        textType='h2'
        className={styles['live-stream__service-title']}
      >
        {translate(timerData.eventName)}
      </Text>

      {isLiveStreamVisible ? <YouTubeCurrentLiveStream url={YouTubeLiveStreamsUrls.main} /> : <Timer data={timerData.start} /> }
    </div>
  )
}

export default LiveStream;
