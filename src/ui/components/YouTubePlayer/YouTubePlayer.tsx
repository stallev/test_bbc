'use client';
import React, { useMemo } from 'react';
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

  // Используем useMemo для вычисления даты
  const displayDate = useMemo(() => {
    // Если это livestream, возвращаем маркер стрима
    if (isLiveStream) {
      return translations.live_stream_marker;
    }

    // Если даты нет, возвращаем пробел
    if (!data?.date) {
      return '\u00A0';
    }

    try {
      // Преобразуем дату
      const date = new Date(data.date);

      // Проверяем валидность даты
      if (isNaN(date.getTime())) {
        return '\u00A0';
      }

      // Форматируем дату используя Intl.DateTimeFormat вместо toLocaleDateString
      const formatter = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
      });

      return formatter.format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '\u00A0';
    }
  }, [data?.date, locale, isLiveStream, translations]);

  return (
    <div className={styles['youtube-player']}>
      {data?.title && (
        <div className={styles['youtube-player__info']}>
          {/* Используем React.Fragment для обертки строки */}
          <Text
            textType="span"
            className={`
            ${styles['youtube-player__info-date']} 
            ${isLiveStream ? styles['youtube-player__info-date--live'] : styles['youtube-player__info-date--published']}
          `}
          >
            {React.createElement(React.Fragment, null, displayDate)}
          </Text>
          <Text textType="span" className={styles['youtube-player__title']}>
            {React.createElement(React.Fragment, null, title)}
          </Text>
        </div>
      )}
      <LiteYouTubeEmbed
        aspectHeight={9}
        aspectWidth={16}
        noCookie={true}
        id={data?.id || ''}
        title={data?.title || ''}
        webp={true}
        wrapperClass={styles['youtube-player__wrap']}
        playerClass={styles['youtube-player__play-button']}
      />
    </div>
  );
};

export default YouTubePlayer;
