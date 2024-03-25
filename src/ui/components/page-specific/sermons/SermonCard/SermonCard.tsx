import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { IoVideocam } from "react-icons/io5";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { AppContext } from '@/ui/globalState/AppContext';
import { useUpdatePlayerInformation } from '@/hooks/useUpdatePlayerInformation';
import { getLocaleFormattedDate } from '@/hooks/useLocaleFormattedDate';
import { Text } from '@/ui/components/ui-kit';
import { SermonCardProps } from './types';

import styles from './styles/sermon-card.module.scss';

const SermonCard = ({
  data,
} : {
  data: SermonCardProps,
}) => {
  const { locale } = useRouter();
  const setPlayingSermon = useUpdatePlayerInformation();
  
  const { state: { playerData: { trackSrc } } } = useContext(AppContext);

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

  const sermonDate = getLocaleFormattedDate(data.sermonDate, locale)
  return (
    <article className={`${styles["sermon-card"]} ${isActiveSermon && styles["sermon-card--active"]}`}>
      <div
        onClick={isActiveSermon ? onStopSermonPlaying : onChangeActiveSermon}
        className={styles["sermon-card__image-wrap"]}
      >
        <Image
          src={data.imageLinks.medium || data.imageLinks.thumbnail}
          fill
          alt=''
          sizes='50vw'
        />
        
        <div className={styles["sermon-card__start"]}>
          {isActiveSermon ? <VscDebugStop /> : <VscDebugStart />}
        </div>
      </div>
      
      <div className={styles["sermon-card__info"]}>
        <Text
          textType='h2'
          className={styles["sermon-card__title"]}
        >
          {data.title}
        </Text>

        <div className={styles["sermon-card__text-data"]}>
          <Text
            textType='p'
            className={styles["sermon-card__preacher"]}
          >
            {data.preachers[0]}
          </Text>
          <div className={styles["sermon-card__source-data"]}>
            <Text
              textType='span'
              className={styles["sermon-card__date"]}
            >
              {sermonDate}
            </Text>
            {!!data.biblebooks[0] && <Text
              textType='span'
              className={styles["sermon-card__scripture"]}
            >
              {
                `${data.biblebooks[0]}
                ${!!data?.sermonBookChapter ? data.sermonBookChapter : ''}
                ${!!data?.sermonBookChapterTextNumber ? `: ${data.sermonBookChapterTextNumber}` : ''}`
              }
            </Text>}
          </div>
        </div>
        <a
          className={styles["sermon-card__video-link"]}
          href={data.sermonYoutubeLink}
          aria-label='video' 
          tabIndex={0}
          target='_blank'
        >
          <IoVideocam />
        </a>
      </div>
    </article>
  )
}

export default SermonCard;
