import React from 'react';
import { RoutePath } from '@/constants';
import { StaffPersonCardProps } from './types';
import { CustomImage, CustomLink, Text } from '@/ui/components/ui-kit';

import styles from './styles/staff-person-card.module.scss';

const StaffPersonCard: React.FC<StaffPersonCardProps> = ({ data, index }: StaffPersonCardProps) => {
  const priorityFetching = (!index ? 1 : index) < 1;
  
  return (
    <CustomLink
      to={`${RoutePath.Staff}/${data.slug}`}
      className={styles["staff-person-card"]}
    >
      <CustomImage
        className={styles["staff-person-card__image"]}
        imageURL={data.imageLinks.large}
        priority={priorityFetching}
        sizes="50vw"
      />
      <div className={styles["staff-person-card__info"]}>
        <Text
          textType='h2'
          className={styles["staff-person-card__name"]}
        >
          {`${data.ministerFirstName} ${data.ministerLastName}`}
        </Text>

        <Text
          textType='span'
          className={styles["staff-person-card__position"]}
        >
          {data.ministerPosition}
        </Text>
      </div>
    </CustomLink>
  )
}

export default StaffPersonCard
