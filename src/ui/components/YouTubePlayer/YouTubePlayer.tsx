'use client';

import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { YouTubeStreamStatus } from '@/constants';
import { Locale } from '@/i18n.config';
import { YoutubeConvertedVideoItemType } from '@/types/YouTubeDataTypes';
import { Text } from '@/ui/components/ui-kit';
import { getDayMonthFormattedDate } from '@/utils/dateFormatter';
import { removeFromFirstPipe } from '@/utils/getFileNameFromUrl';
import { getTranslations } from '@/utils/languageParser';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import styles from './styles/youtube-player.module.scss';

interface YouTubePlayerProps {
  data: YoutubeConvertedVideoItemType;
  locale: Locale;
}

const YouTubePlayer = ({ data, locale }: YouTubePlayerProps) => {
  const translations = getTranslations(locale);
  const isLiveStream = data?.status === YouTubeStreamStatus.live;

  return (
    <div className={styles['youtube-player']}>
      {data?.title && (
        <div className={styles['youtube-player__info']}>
          <Text
            textType="span"
            className={`
            ${styles['youtube-player__info-date']} 
            ${isLiveStream ? styles['youtube-player__info-date--live'] : styles['youtube-player__info-date--published']}
          `}
          >
            {/* {isLiveStream
              ? translations.live_stream_marker
              : getDayMonthFormattedDate(data?.date, locale)} */}
            {data?.date}
          </Text>

          <Text textType="span" className={styles['youtube-player__title']}>
            {removeFromFirstPipe(data.title)}
          </Text>
        </div>
      )}
      <LiteYouTubeEmbed
        aspectHeight={9}
        aspectWidth={16}
        noCookie={true}
        id={data.id}
        title={data.title}
        webp={true}
        wrapperClass={styles['youtube-player__wrap']}
        // playerClass={styles["youtube-player__wrap"]}
        playerClass={styles['youtube-player__play-button']}
      />
    </div>
  );
};

export default YouTubePlayer;
