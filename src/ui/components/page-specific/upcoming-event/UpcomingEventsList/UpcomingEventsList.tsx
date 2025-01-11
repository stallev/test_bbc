"use client";

import React, { useRef } from "react";
import { useOnceIntersection } from "@/hooks/useOnceIntersection";
import UpcomingEventCard from "@/ui/components/page-specific/upcoming-event/UpcomingEventCard/UpcomingEventCard";
import { UpcomingEventListProps } from "@/ui/components/page-specific/home/UpcomingEvents/types";

import styles from "./styles/upcoming-events-list.module.scss";

const UpcomingEventsList = ({ data }: UpcomingEventListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimated = useOnceIntersection(listRef);

  return (
    <div
      ref={listRef}
      className={`${styles["upcoming-events-list"]} ${isAnimated ? styles.animated : ''}`}
    >
      {data.map((item) => (<UpcomingEventCard key={item.slug} data={item} />))}
    </div>
  )
};

export default UpcomingEventsList;