import React from 'react';
import cx from 'classnames';
import Swipeable from 'react-swipeable';
import { RoutePath } from '@/constants';
import { CustomImage, Text, CustomLink } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import { UpcomingEventProps } from './types';

import styles from './styles/upcoming-event.module.scss';

const UpcomingEvent:React.FC<UpcomingEventProps> = ({ data, isActive }: UpcomingEventProps) => {
  const translate = useTranslationFunction();

  return (
    <div className={
      cx(
        styles['upcoming-event'],
        {
          [styles['upcoming-event--active']]: isActive,
        },
      )
    }>
      <CustomImage
        imageURL={data.imageLinks.large}
        className={styles["upcoming-event__image"]}
        alt={data.title}
        priority={true}
        ariaLabel="Background image"
        sizes="100vw"
      />

      <Container className={styles["upcoming-event__content-wrap"]}>
        <div className={styles["upcoming-event__content"]}>
          <Text
            textType='h2'
            className={styles["upcoming-event__title"]}
          >
            {data.title}
          </Text>

          <Text
            textType='p'
            className={styles["upcoming-event__short-description"]}
          >
            {data.upcomingEventShortDescription}
          </Text>

          <CustomLink
            to={`${RoutePath.UpcomingEvents}/${data.slug}`}
            label={translate("event_link_label")}
            className={styles["upcoming-event__link-more"]}
            ariaLabel={`${translate("aria_label_link_go_to")}${data.title} ${translate("aria_label_page")}`}
          />
        </div>
      </Container>
    </div>
  )
}

export default UpcomingEvent;
