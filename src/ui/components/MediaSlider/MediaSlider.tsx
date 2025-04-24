import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { useSwipeable } from "react-swipeable";
import { MediaSliderProps } from './types';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MediaGalleryItemProps } from '../MediaGallery/types';

import styles from './styles/media-slider.module.scss';

const MediaSlider:React.FC<MediaSliderProps> = ({
  data,
  activeMediaItem,
  setActiveMediaItem,
}) => {
  const onChangeActiveMediaItem = (mediaItem: MediaGalleryItemProps) => () => {
    setActiveMediaItem(mediaItem);
  };

  const handleNext = () => {
    const nextIndex = (data.indexOf(activeMediaItem) + 1) % data.length;
    setActiveMediaItem(data[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (data.indexOf(activeMediaItem) - 1 + data.length) % data.length;
    setActiveMediaItem(data[prevIndex]);
  };

  const onSwipe = (direction: string) => {
    const currentIndex = data.findIndex(item => item === activeMediaItem);
    let newIndex = currentIndex;

    if (direction === 'right') {
      newIndex = (currentIndex - 1 + data.length) % data.length;
    } else if (direction === 'left') {
      newIndex = (currentIndex + 1) % data.length;
    }

    setActiveMediaItem(data[newIndex]);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onSwipe('left'),
    onSwipedRight: () => onSwipe('right'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div className={styles["media-slider"]}>
      <button tabIndex={0} aria-label='Previous slide' className={styles["media-slider__button-prev"]} onClick={handlePrev}>
        <IoIosArrowDropleft />
      </button>

      {
        activeMediaItem.type == 'image' && (
          <div className={styles["media-slider__active-img-wrap"]}  {...swipeHandlers}>
            <Image
              priority
              fill
              alt=''
              sizes='50vw'
              key={activeMediaItem.order}
              src={activeMediaItem.src}
            />
          </div>
        )
      }

      <button tabIndex={0} aria-label='Next slide' className={styles["media-slider__button-next"]} onClick={handleNext}>
        <IoIosArrowDropright />
      </button>

      <div className={styles["media-slider__points-list"]}>
        {data.map((mediaItem) =>
          <div
            key={mediaItem.order}
            className={cx(
              styles["media-slider__item-point"],
              {
                [styles['media-slider__item-point--active']]: mediaItem === activeMediaItem,
              },
            )}
            onClick={onChangeActiveMediaItem(mediaItem)}
          ></div>
        )}
      </div>
      
      <div className={styles["media-slider__buttons"]}>
        
        
      </div>
    </div>
  )
}

export default MediaSlider
