import React from 'react';
import { Text } from '@/ui/components/ui-kit';
import MarkdownContent from '@/ui/components/MarkdownContent/MarkdownContent';

import styles from "./styles/ministry-description.module.scss";

interface MinistryDescriptionProps {
  translations: Record<string, string>
  ministryDays: string
  ministryHours: string
  ministryShortDescription: string
}

const MinistryDescription = ({
  translations,
  ministryDays,
  ministryHours,
  ministryShortDescription,
}: MinistryDescriptionProps) => {
  return (
    <div className={styles["ministry-description"]}>
      <Text
        textType='h3'
        className={styles["ministry-description__title"]}
      >
        {translations.about_ministry}
      </Text>
      
      <div className={styles["ministry-description__content"]}>
        <div className={styles["ministry-description__active-time"]}>
          <Text
            textType='span'
            className={styles["ministry-description__active-days"]}
          >
            {ministryDays}
          </Text>

          <Text
            textType='span'
            className={styles["ministry-description__active-hours"]}
          >
            {ministryHours}
          </Text>
        </div>

        <MarkdownContent
          content={ministryShortDescription}
          className={styles["ministry-description__text"]}
        />
      </div>
    </div>
  )
}

export default MinistryDescription;
