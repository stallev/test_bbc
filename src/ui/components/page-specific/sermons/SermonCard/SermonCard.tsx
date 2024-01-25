import React from 'react';
import { IoVideocam } from "react-icons/io5";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";

import { SermonCardProps } from './types';

import styles from './styles/sermon-card.module.scss';
import { CustomImage, Text } from '@/ui/components/ui-kit';

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
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcsHtDPQAG2gKcgjPHewAAAABJRU5ErkJggg==";

  return (
    <article className={`${styles["sermon-card"]} ${isActive && styles["sermon-card--active"]}`}>
      <div
        onClick={isActive ? stopPlayingSermon : onChangePlayingSermon}
        className={styles["sermon-card__image-wrap"]}
      >
        <CustomImage
          className={styles["sermon-card__image"]}
          imageURL={data.imageLinks.medium || data.imageLinks.thumbnail}
          priority={index < 2}
          placeholder='blur'
          blurDataURL={blurDataURL}
          sizes='420px'
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
            {data.sermonsPreachers[0]}
          </Text>
          <div className={styles["sermon-card__description-data"]}>
            <div className={styles["sermon-card__source-data"]}>
              <Text
                textType='span'
                className={styles["sermon-card__date"]}
              >
                {data.sermonDate}
              </Text>
              <Text
                textType='span'
                className={styles["sermon-card__scripture"]}
              >
                {`${data.biblebooks[0]} ${data.sermonBookChapter}: ${data.sermonBookChapterTextNumber}`}
              </Text>
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
        </div>
      </div>
    </article>
  )
}

export default SermonCard;
