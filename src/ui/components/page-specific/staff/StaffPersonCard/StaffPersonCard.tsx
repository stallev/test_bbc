import React from 'react';

import { RoutePath } from '@/constants';
import { CustomImage, Text, Icon, ReadMoreLink } from '@/ui/components/ui-kit';
import { stripHtmlTags } from '@/utils';

import styles from './styles/staff-person-card.module.scss';
import { StaffPersonCardProps } from './types';

const StaffPersonCard: React.FC<StaffPersonCardProps> = ({
  data,
  translations,
  isDetailed,
  index,
  isLandingPage = false,
}: StaffPersonCardProps) => {
  const priorityFetching = !isLandingPage ? (!index ? 1 : index) < 1 : false;

  return (
    <article
      className={`
        ${styles['staff-person-card']}
        ${isDetailed ? styles['staff-person-card--detailed'] : styles['staff-person-card--reduced']}
      `}
    >
      <div className={styles['staff-person-card__photo']}>
        <Icon iconName="smallLogo" className={styles['staff-person-card__logo-icon']} />

        <div className={styles['staff-person-card__image-wrap']}>
          <CustomImage
            className={styles['staff-person-card__image']}
            imageURL={data.imageLinks.large}
            priority={priorityFetching}
            sizes="38vw"
          />
        </div>
      </div>

      <div className={styles['staff-person-card__info']}>
        <Text textType="span" className={styles['staff-person-card__position']}>
          {data.ministerPosition}
        </Text>

        <Text textType="h3" className={styles['staff-person-card__name']}>
          {`${data.ministerFirstName} ${data.ministerLastName}`}
        </Text>

        {isDetailed && (
          <Text textType="p" className={styles['staff-person-card__description']}>
            {data?.excerpt && stripHtmlTags(data.excerpt)}
          </Text>
        )}

        <ReadMoreLink
          to={`${RoutePath.Staff}/${data.slug}`}
          label={translations.read_more_label}
          className={styles['staff-person-card__read-more']}
        />
      </div>
    </article>
  );
};

export default StaffPersonCard;
