"use client"

import React from "react";
import Container from "@/ui/containers/Container/Container";
import { useClientTranslationFunction } from "@/hooks/useLocale";
import { Text, CustomLink, Icon } from "@/ui/components/ui-kit";
import UpcomingEventsList from "@/ui/components/page-specific/upcoming-event/UpcomingEventsList/UpcomingEventsList";
import SubscribeForm from "@/ui/components/SubscribeForm/SubscribeForm";
import { RoutePath, LinkTypes } from "@/constants";
import { UpcomingEventListProps } from "./types";

import styles from "./styles/upcoming-events.module.scss";

const UpcomingEvents = ({ data }: UpcomingEventListProps) => {
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

        <UpcomingEventsList data={data} isLandingPage />

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
