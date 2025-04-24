"use client"

import React, { useRef } from "react";
import Container from "@/ui/containers/Container/Container";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import { useOnceIntersection } from "@/hooks/useOnceIntersection";
import { Text, CustomLink, Icon } from "@/ui/components/ui-kit";
import UpcomingEventCard from "../UpcomingEventCard/UpcomingEventCard";
import SubscribeForm from "@/ui/components/SubscribeForm/SubscribeForm";
import { RoutePath, LinkTypes } from "@/constants";
import { UpcomingEventListProps } from "./types";

import styles from "./styles/upcoming-events.module.scss";

const UpcomingEvents = ({ data }: UpcomingEventListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const isAnimated = useOnceIntersection(listRef);
  const translate = useClientTranslationFunction();

  return (
    <Container>
      <div className={styles["upcoming-events"]}>
        <Text
          textType="h1"
          className={styles["upcoming-events__title"]}
        >
          {translate("upcoming_events_section_title")}
        </Text>

        <div
          ref={listRef}
          className={`${styles["upcoming-events__list"]} ${isAnimated ? styles.animated : ''}`}
        >
          {data.map((item) => (<UpcomingEventCard key={item.slug} data={item} />))}
        </div>

        <CustomLink
          to={RoutePath.UpcomingEvents}
          className={styles["upcoming-events__all-events-link"]}
          type={LinkTypes.secondary}
        >
          <Text textType="span">{translate("all_events_link_label")}</Text>
          <Icon iconName="rightArrow" />
        </CustomLink>
      </div>
      
      <SubscribeForm />
    </Container>
  );
};

export default UpcomingEvents;
