import React, { useContext } from 'react';

import { useLocale } from '@/hooks/useLocale';
import { useUpdatePlayerInformation } from '@/hooks/useUpdatePlayerInformation';
import { RenderingSermonCardDataType } from '@/types/WPDataTypes/SermonPostsDataTypes';
import { Text, Icon } from '@/ui/components/ui-kit';
import { AppContext } from '@/ui/globalState/AppContext';
import { getLocaleFormattedDate } from '@/utils/dateFormatter';

import styles from './styles/sermon-card.module.scss';

const SermonCard = ({ data }: { data: RenderingSermonCardDataType }) => {
  const locale = useLocale();
  const setPlayingSermon = useUpdatePlayerInformation();

  const {
    state: {
      playerData: { trackSrc },
    },
  } = useContext(AppContext);

  const isActiveSermon = trackSrc === data.sermonAudio;

  const onChangeActiveSermon = () => {
    setPlayingSermon({
      isVisiblePlayer: true,
      trackName: data.title,
      trackSrc: data.sermonAudio,
    });
  };

  const onStopSermonPlaying = () => {
    setPlayingSermon({
      isVisiblePlayer: false,
      trackName: '',
      trackSrc: '',
    });
  };

  const sermonDate = getLocaleFormattedDate(data.sermonDate, locale);
  return (
    <article
      className={`${styles['sermon-card']} ${isActiveSermon && styles['sermon-card--active']}`}
    >
      <Text textType="p" className={styles['sermon-card__preacher']}>
        {data.preachers[0].value}
      </Text>

      <Text textType="span" className={styles['sermon-card__date']}>
        {sermonDate}
      </Text>

      <Text textType="h3" className={styles['sermon-card__title']}>
        {data.title}
      </Text>

      <div
        className={styles['sermon-card__play-control']}
        onClick={isActiveSermon ? onStopSermonPlaying : onChangeActiveSermon}
      >
        {isActiveSermon ? (
          <Icon iconName="stopPlayControl" className={styles['sermon-card__play-control-icon']} />
        ) : (
          <Icon iconName="playControl" className={styles['sermon-card__play-control-icon']} />
        )}
      </div>
    </article>
  );
};

export default SermonCard;
