import React, { useMemo, useRef } from 'react';
import { Text, Icon } from '@/ui/components/ui-kit';
import YouTubePlayer from '@/ui/components/YouTubePlayer/YouTubePlayer';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { isDesktopSize, isSmallWindowSize } from "@/hooks/useWindowSizeType";
import { getMonthName } from '@/utils/dateFormatter';
import { YearStreamsListProps, YoutubeConvertedVideoItemType } from "@/types/YouTubeDataTypes";

import styles from "./styles/year-streams-list.module.scss";

const YearStreamsList = ({
  locale,
  data,
  selectedStreamsPeriod,
  setSelectedStreamsPeriod
}: YearStreamsListProps) => {
  const { width } = useWindowDimensions();
  const isSmallDesktop = isSmallWindowSize(width);
  const yearStreamsListRef = useRef<HTMLDivElement>(null);
  const isThisYearSelected = data.yearNumber === selectedStreamsPeriod.year;
  const currentYearMonth = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };

  const minusedAddedTop = isSmallDesktop ? 70 : 55;

  const onCrossClick = () => {
    setSelectedStreamsPeriod((prevState) => {
      const newState = isThisYearSelected
        ? { ...prevState, year: null, month: null }
        : { ...prevState, year: data.yearNumber, month: currentYearMonth.month };
        
      if (!isThisYearSelected && yearStreamsListRef.current) {
        setTimeout(() => {
          const rect = yearStreamsListRef.current?.getBoundingClientRect();
          if (rect) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = scrollTop + rect.top - minusedAddedTop;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }, 0);
      }
      
      return newState;
    });
  };

  const selectActiveMonth = (monthNumber: number) => () => {
    setSelectedStreamsPeriod((prevState) => ({
      ...prevState,
      month: monthNumber,
    }));
  };

  const monthsList = useMemo(() => {
    const orderedMonths = isDesktopSize(width)
      ? [0, 4, 8, 1, 5, 9, 2, 6, 10, 3, 7, 11]
      : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const selectedVideos = data.monthListArray.find(
      (month) => month.monthNumber === selectedStreamsPeriod.month
    )?.videoListArray;

    const currentYearMonthsList = orderedMonths.map((index) => {
      const monthItem = data.monthListArray.find(
        (month) => month.monthNumber === index
      );

      return monthItem ? (
        <Text
          key={monthItem.monthNumber}
          textType="span"
          className={`
            ${styles["year-streams-list__month"]}
            ${
              monthItem.monthNumber === selectedStreamsPeriod.month
                ? styles["year-streams-list__month--active"]
                : ""
            }
          `}
          onClick={selectActiveMonth(monthItem.monthNumber)}
        >
          {getMonthName(monthItem.monthNumber, locale)}
        </Text>
      ) : null;
    });

    return (
      <div
        className={`${styles["year-streams-list__content"]} ${
          isThisYearSelected ? styles["year-streams-list__content--expanded"] : ""
        }`}
      >
        <div className={styles["year-streams-list__months-list"]}>
          {currentYearMonthsList}
        </div>
        <div className={styles["year-streams-list__videos-list"]}>
          {selectedVideos?.map((video: YoutubeConvertedVideoItemType) => (
            <YouTubePlayer key={video.id} data={video} locale={locale} />
          ))}
        </div>
      </div>
    );
  }, [width, data.monthListArray, isThisYearSelected, selectedStreamsPeriod.month, locale]);

  return (
    <div className={styles["year-streams-list"]} ref={yearStreamsListRef}>
      <div className={styles["year-streams-list__header"]}>
        <Text
          textType="h3"
          className={styles["year-streams-list__year-number"]}
        >
          {data.yearNumber}
        </Text>

        <div className={styles["year-streams-list__icon-wrap"]} onClick={onCrossClick}>
          <Icon
            iconName="boldCross"
            className={`
              ${styles["year-streams-list__icon"]} 
              ${
                isThisYearSelected
                  ? styles["year-streams-list__icon--transform"]
                  : ""
              }
            `}
          />
        </div>
      </div>

      {monthsList}
    </div>
  );
};

export default YearStreamsList;