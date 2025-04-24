import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RoutePath } from '@/constants/RoutePath';
import { BlurDataURLs } from '@/constants/BlurDataURLs';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { getShortMonthFormattedDate } from '@/utils/dateFormatter';
import { stripHtmlTags } from '@/utils';
import { TimelineEventProps } from '../types';

import styles from './styles/timeline-event.module.scss';

const TimelineEvent:React.FC<TimelineEventProps> = ({
  excerpt,
  featuredImage,
  timelineEventDate,
  title,
  slug
}) => {
  const { locale } = useRouter();
  const translate = useTranslationFunction();
  const eventDate = getShortMonthFormattedDate(timelineEventDate, locale);
  const postLink = `${RoutePath.Timeline}/${slug}`;

  return (
    <div className={styles["timeline-event"]}>
      <p
        className={styles["timeline-event__date"]}
      >
        {eventDate}
      </p>
      <Link
        href={postLink}
        className={styles["timeline-event__image-wrap"]}
        aria-label={title}
        tabIndex={0}
      >
        <Image
          src={featuredImage.node.mediaItemUrl }
          fill
          placeholder='blur'
          blurDataURL={BlurDataURLs.timelineEventCard}
          alt={title}
          sizes='50vw'
        />
      </Link>

      <div className={styles["timeline-event__info"]}>
        <Link
          href={postLink}
          className={styles["timeline-event__title-link"]}
          aria-label={title}
          tabIndex={0}
        >
          <h2
            className={styles["timeline-event__title"]}
          >
            {title}
          </h2>
        </Link>

        <p
          className={styles["timeline-event__description"]}
        >
          {stripHtmlTags(excerpt)}
        </p>

        <div className={styles["timeline-event__meta"]}>
          
          <Link
            href={postLink}
            className={styles["timeline-event__read-more-link"]}
            tabIndex={0}
          >
            {`${translate("more_link_label")}...`}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TimelineEvent;
