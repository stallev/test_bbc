'use client';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CustomImage, Icon } from '@/ui/components/ui-kit';

import styles from './styles/media-gallery-slider.module.scss';
import { MediaGallerySliderProps } from './types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MediaGallerySlider: React.FC<MediaGallerySliderProps> = ({ data }) => {
  return (
    <div className={styles['media-gallery-slider__container']}>
      <div className={styles['media-gallery-slider__prev']}>
        <Icon iconName="playControl" className={styles['media-gallery-slider__prev-icon']} />
      </div>
      <div className={styles['media-gallery-slider__next']}>
        <Icon iconName="playControl" className={styles['media-gallery-slider__next-icon']} />
      </div>

      <Swiper
        navigation={{
          prevEl: `.${styles['media-gallery-slider__prev']}`,
          nextEl: `.${styles['media-gallery-slider__next']}`,
        }}
        modules={[Navigation]}
        className={styles['media-gallery-slider']}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          450: { slidesPerView: 2, spaceBetween: 30 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 34 },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className={styles['media-gallery-slider__slide']}>
            <div className={styles['media-gallery-slider__slide-image-container']}>
              <CustomImage
                imageURL={item.src}
                className={styles['media-gallery-slider__slide-image']}
                sizes="(max-width: 768px) 25vw, 20vw"
                priority={index < 1}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediaGallerySlider;
