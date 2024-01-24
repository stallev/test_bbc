import React from 'react';
import Container from '@/ui/containers/Container/Container';
import { StaffListProps } from './type';
import StaffPersonCard from '../StaffPersonCard/StaffPersonCard';

import styles from './styles/staff-list.module.scss';

const StaffList: React.FC<StaffListProps> = ({ data }) => {
  return (
    <Container className={styles["staff-list"]}>
      {
        data.map((personCard, index) => <StaffPersonCard key={personCard.data.slug} data={personCard.data} index={index} />)
      }
    </Container>
  )
}

export default StaffList;
