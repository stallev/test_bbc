import React from 'react';

import StaffList from '@/ui/components/page-specific/staff/StaffList/StaffList';
import { Text } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/staff.module.scss';
import { StaffSectionProps } from './types';

const Staff = ({ data, translations }: StaffSectionProps) => {
  return (
    <Container className={styles.staff}>
      <Text textType="h2" className={styles.staff__title}>
        {translations.pastors_list_title}
      </Text>

      <StaffList translations={translations} data={data} />
    </Container>
  );
};

export default Staff;
