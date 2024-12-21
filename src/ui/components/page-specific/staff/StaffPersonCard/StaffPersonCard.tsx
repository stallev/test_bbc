import React from 'react';
import { RoutePath } from '@/constants';
import { StaffPersonCardProps } from './types';
import { CustomImage, CustomLink, Text, Icon, ReadMoreLink } from '@/ui/components/ui-kit';

import styles from './styles/staff-person-card.module.scss';

const StaffPersonCard: React.FC<StaffPersonCardProps> = ({ data, translations, index }: StaffPersonCardProps) => {
  const priorityFetching = (!index ? 1 : index) < 1;
  
  return (
    <article
      className={styles["staff-person-card"]}
    >
      <Icon iconName='smallLogo' className={styles["staff-person-card__logo-icon"]} />
      
      <CustomImage
        className={styles["staff-person-card__image"]}
        imageURL={data.imageLinks.large}
        priority={priorityFetching}
        sizes="50vw"
      />
      <div className={styles["staff-person-card__info"]}>
        <Text
          textType='span'
          className={styles["staff-person-card__position"]}
        >
          {data.ministerPosition}
        </Text>

        <Text
          textType='h3'
          className={styles["staff-person-card__name"]}
        >
          {`${data.ministerFirstName} ${data.ministerLastName}`}
        </Text>

        <ReadMoreLink
          to={`${RoutePath.Staff}/${data.slug}`}
          label={translations.read_more_label}
        />
      </div>
    </article>
  )
}

export default StaffPersonCard
