"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CustomImage } from '@/ui/components/ui-kit';
import { MinistryImageData } from '@/types/WPDataTypes/MinistryWPDataTypes';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/ministry-slider.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MinistrySliderProps {
  images: MinistryImageData[];
}

const MinistrySlider: React.FC<MinistrySliderProps> = ({ images }) => {
  return (
    <Container
      className={styles["ministry-slider__container"]}
      isSliderContent
    >
      <Swiper
        slidesPerView={5}
        centeredSlides={true}
        loop={true}
        className={`${styles["ministry-slider"]} ministry-page-slider`}
        breakpoints={{
          320: { spaceBetween: 10 },
          768: { spaceBetween: 20 },
          1024: { spaceBetween: 25 },
          1280: { spaceBetween: 30 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles["ministry-slider__slide"]}>
            <CustomImage
              imageURL={image.imageUrl}
              className={styles["ministry-slider__slide-image"]}
              sizes="(max-width: 768px) 25vw, 20vw"
              priority={index < 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default MinistrySlider;