"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'
import { NavBarMinistryLinks } from '@/constants/NavBarLinks'
import { CustomLink } from '@/ui/components/ui-kit'
import PrayerRequest from './PrayerRequest/PrayerRequest';
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { isSmallWindowSize } from "@/hooks/useWindowSizeType";

import 'swiper/css'
import 'swiper/css/navigation'
import styles from "./styles/ministries-list.module.scss"

interface MinistriesListProps {
  translations: Record<string, string>
}

const MinistriesList = ({ translations }: MinistriesListProps) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {
        isSmallWindowSize(width)
          ? <div className={styles["ministries-slider-container"]}>
            <Swiper
              direction="vertical"
              slidesPerView={5}
              spaceBetween={5}
              mousewheel={true}
              modules={[Mousewheel]}
              className={`ministries-slider ${styles["ministries-list"]}`}
              navigation={false}
              loop={true}
              watchSlidesProgress={true}
            >
              {NavBarMinistryLinks.map(({ link, label }, index) => (
                <SwiperSlide
                  key={index}
                  className={styles["ministries-list__slide"]}
                >
                  <CustomLink
                    to={link}
                    ariaLabel={translations[label]}
                    className={styles["ministries-list__link"]}
                  >
                    {translations[label]}
                  </CustomLink>
                </SwiperSlide>
              ))}
              <div className={`swiper-button-prev ${styles["ministries-list__nav-prev"]}`}></div>
              <div className={`swiper-button-next ${styles["ministries-list__nav-next"]}`}></div>
            </Swiper>
          </div>
          : <div className={styles["ministries-list"]}>
            {NavBarMinistryLinks.map(({ link, label }, index) => (
              <CustomLink
                to={link}
                ariaLabel={translations[label]}
                className={styles["ministries-list__link"]}
                key={index}
              >
                {translations[label]}
              </CustomLink>
            ))}
          </div>
      }
      <PrayerRequest translations={translations} />
    </>
  )
}

export default MinistriesList
