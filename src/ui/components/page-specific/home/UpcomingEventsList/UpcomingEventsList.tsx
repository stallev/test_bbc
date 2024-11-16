"use client"

import React, { useState, useEffect } from "react";
import cx from 'classnames';
import { useSwipeable } from "react-swipeable";
import Container from "@/ui/containers/Container/Container";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import { Text, CustomLink } from "@/ui/components/ui-kit";
import { RoutePath } from "@/constants";
import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { isTabletWindowSize } from "@/hooks/useWindowSizeType";
import { IoIosArrowForward } from "react-icons/io";
import { UpcomingEventListProps  } from "./types";
import { UpcomingEventProps } from "../UpcomingEvent/types";

import styles from "./styles/upcoming-events-list.module.scss";

const UpcomingEventsList: React.FC<UpcomingEventListProps> = ({ data }: UpcomingEventListProps) => {
  const translate = useClientTranslationFunction();
  const { width } = useWindowDimensions();
  const isTabletSize = isTabletWindowSize(width);

  const [activeUpcomingEvent, setActiveUpcomingEvent] = useState(data[0]);

  const onChangeActiveEvent = (upcomingEvent: UpcomingEventProps) => () => {
    setActiveUpcomingEvent(upcomingEvent)
  }

  const onSwipe = (direction: string) => {
    const currentIndex = data.findIndex(item => item === activeUpcomingEvent);
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = (currentIndex - 1 + data.length) % data.length;
    } else if (direction === 'right') {
      newIndex = (currentIndex + 1) % data.length;
    }

    setActiveUpcomingEvent(data[newIndex]);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onSwipe('left'),
    onSwipedRight: () => onSwipe('right'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    setActiveUpcomingEvent(data[0]);
  }, [data])
  
  return (
    <div className={styles["upcoming-events-list"]}>
      <Container className={styles["upcoming-events-list__menu"]}>
        <div className={styles["upcoming-events-list__menu-items"]}>
          {
            data.map((item) => 
              <CustomLink
                key={item.data.slug}
                to={`${RoutePath.UpcomingEvents}/${item.data.slug}`}
                className={
                  cx(
                    styles["upcoming-events-list__menu-link"],
                    {
                      [styles['upcoming-events-list__menu-link--active']]: item === activeUpcomingEvent,
                    },
                  )
                }
                onHover={onChangeActiveEvent(item)}
                ariaLabel={`${translate("aria_label_link_go_to")}${item.data.title} ${translate("aria_label_page")}`}
              >
                {
                  !isTabletSize && 
                    <div className={styles["upcoming-events-list__menu-link-label"]}>
                      <Text textType="span">{item.data.title}</Text>
                      <IoIosArrowForward />
                    </div>
                }
              </CustomLink>
            )
          }
        </div>
      </Container>

      <div className={styles["upcoming-events-list__events-wrap"]} {...swipeHandlers}>
        {
          data.map((item) => 
            <UpcomingEvent
              key={item.data.slug}
              data={item.data}
              isActive = {item === activeUpcomingEvent}
            />
          )
        }
      </div>
    </div>
  );
};

export default UpcomingEventsList;
