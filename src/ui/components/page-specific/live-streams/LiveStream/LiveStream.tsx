"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { convertMillisecondsToTimeData, getServiceTimeDifference } from '@/hooks/useTimerData';
import { RegularLiveStreamsEventsData } from '@/constants/TimerData';
import { useClientTranslationFunction } from '@/hooks/useLocale';
import { EventTimerData } from '@/hooks/useTimerData';
import { Text } from '@/ui/components/ui-kit';
import { YouTubeLiveStreamsUrls } from '@/constants';
import Timer from '../Timer/Timer';
import { LiveStreamTypes } from './types';

const YouTubeCurrentLiveStream = dynamic(() => import('../YouTubeCurrentLiveStream/YouTubeCurrentLiveStream'));

import styles from './styles/live-stream.module.scss';

const LiveStream: React.FC<LiveStreamTypes> = ({ data }) => {
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

  const translate = useClientTranslationFunction();

  const streamUrls = [...data.liveVideos, ...data.upcomingVideos];

  const isPromisedStream = !!streamUrls.length;

  const isLiveStreamVisible = isPromisedStream || timerData.start.totalMillisecondsCount < 0;

  const serviceTitle = !!streamUrls.length ? streamUrls[0].title : timerData.eventName;

  const livestreamData = {
    url: isPromisedStream ? `https://www.youtube.com/embed/${streamUrls[0].id}?autoplay=1&amp` : YouTubeLiveStreamsUrls.main,
    title: serviceTitle
  };

  const sortedEventsArray = RegularLiveStreamsEventsData.sort((a, b) =>
    getServiceTimeDifference(a).totalMillisecondsCount.endServiceTimeDifference
    - getServiceTimeDifference(b).totalMillisecondsCount.endServiceTimeDifference);

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
      {!isLiveStreamVisible &&
        <div className={styles['live-stream__description']}>
          <Text
            textType='p'
            className={styles['live-stream__service-description']}
          >
            {translate("stream_description")}
          </Text>

          <Text
            textType='h2'
            className={styles['live-stream__service-title']}
          >
            {translate(serviceTitle)}
          </Text>
        </div>}

      {isLiveStreamVisible ? <YouTubeCurrentLiveStream data={livestreamData} /> : <Timer data={timerData.start} />}
    </div>
  )
}

export default LiveStream;
