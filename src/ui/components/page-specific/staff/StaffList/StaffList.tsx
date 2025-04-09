import React from 'react';

import { StaffListProps } from './type';
import StaffPersonCard from '../StaffPersonCard/StaffPersonCard';
import styles from './styles/staff-list.module.scss';

const StaffList = ({ data, translations, isDetailed = false }: StaffListProps) => {
  return (
    <div
      className={`
      ${styles['staff-list']}
      ${isDetailed ? styles['staff-list--detailed'] : ''}
    `}
    >
      {data.map((personCard, index) => (
        <StaffPersonCard
          isDetailed={isDetailed}
          key={personCard.slug}
          data={personCard}
          translations={translations}
          index={index}
        />
      ))}
    </div>
  );
};

export default StaffList;
