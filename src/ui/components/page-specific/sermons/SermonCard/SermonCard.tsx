import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { IoVideocam } from "react-icons/io5";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

import { SermonCardProps } from './types';

import styles from './styles/sermon-card.module.scss';
import { Text } from '@/ui/components/ui-kit';
import { getLocaleFormattedDate } from '@/hooks/useLocaleFormattedDate';

const SermonCard = ({
  data,
  index,
  onChangePlayingSermon,
  stopPlayingSermon,
  isActive
} : {
  data: SermonCardProps,
  index: number,
  onChangePlayingSermon: () => void
  stopPlayingSermon: () => void
  isActive: boolean
}) => {
  const { locale } = useRouter();

  const sermonDate = getLocaleFormattedDate(data.sermonDate, locale)
  return (
    <article className={`${styles["sermon-card"]} ${isActive && styles["sermon-card--active"]}`}>
      <div
        onClick={isActive ? stopPlayingSermon : onChangePlayingSermon}
        className={styles["sermon-card__image-wrap"]}
      >
        <Image
          src={data.imageLinks.medium || data.imageLinks.thumbnail}
          fill
          alt=''
          priority={true}
          sizes='50vw'
        />
        
        <div className={styles["sermon-card__start"]}>
          {isActive ? <VscDebugStop /> : <VscDebugStart />}
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
          <div className={styles["sermon-card__description-data"]}>
            <div className={styles["sermon-card__source-data"]}>
              <Text
                textType='span'
                className={styles["sermon-card__date"]}
              >
                {sermonDate}
              </Text>
              <Text
                textType='span'
                className={styles["sermon-card__scripture"]}
              >
                {`${data.biblebooks[0]} ${data.sermonBookChapter}: ${data.sermonBookChapterTextNumber}`}
              </Text>
            </div>
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
