'use client';

import React from 'react';

import { RoutePath } from '@/constants';
import { useClientTranslationFunction, useLocale } from '@/hooks/useLocale';
import { CustomImage, Text, ReadMoreLink } from '@/ui/components/ui-kit';
import { getDayMonthFormattedDate } from '@/utils/dateFormatter';

import styles from './styles/upcoming-event-card.module.scss';
import { UpcomingEventCardItemProps } from './types';

const UpcomingEventCard = ({
  data,
  isLandingPage = false,
}: {
  data: UpcomingEventCardItemProps;
  isLandingPage?: boolean;
}) => {
  const locale = useLocale();
  const translate = useClientTranslationFunction();

  return (
    <article className={styles['upcoming-event-card']}>
      <Text textType="span" className={styles['upcoming-event-card__start-date']}>
        {getDayMonthFormattedDate(data.upcomingEventStart, locale)}
      </Text>

      <CustomImage
        imageURL={data.featuredImageUrl}
        className={styles['upcoming-event-card__image']}
        alt={data.title}
        priority={!isLandingPage}
        ariaLabel={data.title}
        sizes="(min-width: 1024px) 100vw, 33vw"
      />

      <Text textType="h3" className={styles['upcoming-event-card__title']}>
        {data.title}
      </Text>

      <Text textType="p" className={styles['upcoming-event-card__description']}>
        {data.upcomingEventShortDescription}
      </Text>

      <ReadMoreLink
        to={`${RoutePath.UpcomingEvents}/${data.slug}`}
        label={translate('read_more_label')}
        className={styles['upcoming-event-card__readmore-link']}
      />
    </article>
  );
};

export default UpcomingEventCard;
