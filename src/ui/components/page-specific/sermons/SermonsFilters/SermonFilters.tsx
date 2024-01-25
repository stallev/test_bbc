import React from 'react';
import dynamic from 'next/dynamic';
import Container from '@/ui/containers/Container/Container';

import styles from './styles/sermons-filters.module.scss';

import { SermonsFiltersProps } from './types';

const Select = dynamic(() => import('react-select'));
const DatePicker = dynamic(() => import('../CustomDatePicker/CustomDatePicker'));

const SermonFilters: React.FC<SermonsFiltersProps> = ({ data }) => {

  console.log(data)
  const booksOptions = data.biblebooks ? data.biblebooks.map((book: string) => {
    return { value: book, label: book };
  }) : [];

  const preachersOptions = data.preachers ? data.preachers.map((item: string) => {
    return { value: item, label: item };
  }) : [];

  const topicsOptions = data.topics ? data.topics.map((item: string) => {
    return { value: item, label: item };
  }) : [];

  return (
    <Container>
      <div className={styles["sermons-filters"]}>
        <div className={styles["sermons-filters__categories"]}>
          <Select
            id="long-value-select"
            instanceId="long-value-select"
            options={booksOptions}
            className={styles["sermons-filters__item"]}
          />
          <Select
            id="long-value-select2"
            instanceId="long-value-select2"
            options={preachersOptions}
            className={styles["sermons-filters__item"]}
          />
          <Select
            id="long-value-select3"
            instanceId="long-value-select3"
            options={topicsOptions}
            className={styles["sermons-filters__item"]}
          />
        </div>

         <div className={styles["sermons-filters__dates"]}>
            <DatePicker />
            <DatePicker />
         </div>
      </div>
    </Container>
  )
}

export default SermonFilters
