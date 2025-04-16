'use client';
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { YouTubeStreamStatus } from '@/constants';
import { Locale } from '@/i18n.config';
import { YoutubeConvertedVideoItemType } from '@/types/YouTubeDataTypes';
import { Text } from '@/ui/components/ui-kit';
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
  const title = removeFromFirstPipe(data?.title || '');

  // Исправленная обработка даты
  const formatDate = () => {
    if (!data?.date) return '\u00A0';

    try {
      const videoDate = new Date(data.date);
      // Проверяем валидность даты
      if (isNaN(videoDate.getTime())) return '\u00A0';

      const options = {
        day: 'numeric' as const,
        month: 'long' as const,
      };

      return videoDate.toLocaleDateString(locale, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '\u00A0';
    }
  };

  const displayDate = formatDate();

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
            {isLiveStream ? translations.live_stream_marker : displayDate}
          </Text>
          <Text textType="span" className={styles['youtube-player__title']}>
            {title}
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
        playerClass={styles['youtube-player__play-button']}
      />
    </div>
  );
};

export default YouTubePlayer;
