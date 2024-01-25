import React from 'react';
import dynamic from 'next/dynamic';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/sermons-filters.module.scss';

import { SermonsFiltersProps } from './types';

// const Select = dynamic(() => import('react-select'));
const CustomSimpleSelect = dynamic(() => import('../CustomSimpleSelect/CustomSimpleSelect'));
const DatePicker = dynamic(() => import('../CustomDatePicker/CustomDatePicker'));

const SermonFilters: React.FC<SermonsFiltersProps> = ({ data }) => {

  return (
    <Container>
      <div className={styles["sermons-filters"]}>
        <div className={styles["sermons-filters__categories"]}>
          <CustomSimpleSelect
            options={data.biblebooks}
            name='Books'
            action='Change book'
          />
          <CustomSimpleSelect
            options={data.preachers}
            name='Preachers'
            action='Change preacher'
          />
          <CustomSimpleSelect
            options={data.topics}
            name='Topics'
            action='Change topic'
          />
        </div>

         <div className={styles["sermons-filters__dates"]}>
            {/* <DatePicker /> */}
            <DatePicker />
         </div>
      </div>
    </Container>
  )
}

export default SermonFilters
