import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import Container from '@/ui/containers/Container/Container';
// import { CustomDatePicker } from '@/ui/components/ui-kit';
import { DEFAULT_SERMONS_FILTER_STATE } from '@/constants/mock';

import styles from './styles/sermons-filters.module.scss';

import { SermonsFiltersComponentProps, SermonsFiltersProps } from './types';
import { SermonCardProps } from '../SermonCard/types';
// import { Button } from '@/ui/components/ui-kit';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomSimpleSelect = dynamic(() => import('@/ui/components/ui-kit/CustomSimpleSelect'));

const SermonFilters: React.FC<SermonsFiltersComponentProps> = ({ 
  categoriesData, 
  fullSermonsList,
  filters,
  setFilters,
  setSermons,
  sermons
 }) => {
  const translate = useTranslationFunction();

  const resetFilters = () => {
    setFilters(DEFAULT_SERMONS_FILTER_STATE);
  };

  const filterAndSortSermons = (
    sermons: SermonCardProps[],
    filterState: SermonsFiltersProps
  ): SermonCardProps[] => {
    const filteredSermons = sermons.filter((sermon) => {
      const { biblebooks, preachers, topics, startDate, endDate } = filterState;

      const sermonDate = new Date(sermon.sermonDate);
      const startFilterDate = new Date(startDate);
      const endFilterDate = new Date(endDate);

      console.log('biblebooks is', biblebooks)
      if (biblebooks !== 'all' && !sermon.biblebooks.includes(biblebooks)) {
        return false;
      }

      if (preachers !== 'all' && !sermon.preachers.includes(preachers)) {
        return false;
      }

      if (topics !== 'all' && !sermon.topics.includes(topics)) {
        return false;
      }
  
      return sermonDate >= startFilterDate && sermonDate <= endFilterDate;
    });
  
    const sortedSermons = filteredSermons.sort(
      (a, b) => new Date(a.sermonDate).getTime() - new Date(b.sermonDate).getTime()
    );
  
    return sortedSermons;
  }

  const getSearchedSermons = async (filterKey: string, filterValue: any) => {
    const activeFilters = {
      ...filters,
      [filterKey]: filterValue,
    };
    setFilters(activeFilters);

    const searchedSermons = filterAndSortSermons(fullSermonsList, activeFilters);

    setSermons({
      ...sermons,
      searchedSermons: [
        ...searchedSermons,
      ],
    });
  }

  const handleCategoriesOnChange = (filterKey: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('event.target.value', event.target.value)
    getSearchedSermons(filterKey, event.target.value);
  };

  const handleStartDateOnChange = (dateValue: Value) => {
    getSearchedSermons('startDate', dateValue);
  };

  const handleEndDateOnChange = (dateValue: Value) => {
    getSearchedSermons('endDate', dateValue);
  };

  const handlePreachersOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoriesOnChange('preachers', event);
  };

  const handleBibleBooksOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoriesOnChange('biblebooks', event);
  };

  const handleTopicsOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleCategoriesOnChange('topics', event);
  };

  // useEffect(() => {
  //   sermons.searchedSermons.map((item) => console.log(item.biblebooks))
  //   console.log('sermons list', sermons)
  // }, [sermons])

  return (
    <Container>
      <div className={styles["sermons-filters"]}>
        <div className={styles["sermons-filters__categories"]}>
          <CustomSimpleSelect
            options={categoriesData.biblebooks}
            name='Books'
            title={translate("bible_books_list_name")}
            defaultValueText={translate("all_bible_books")}
            onChangeValue={handleBibleBooksOnChange}
            selectedValue={filters.biblebooks}
            ariaLabel={translate("bible_books_list_name")}
          />
          <CustomSimpleSelect
            options={categoriesData.preachers}
            name='Preachers'
            title={translate("preachers_list_name")}
            defaultValueText={translate("all_preachers")}
            onChangeValue={handlePreachersOnChange}
            selectedValue={filters.preachers}
            ariaLabel={translate("preachers_list_name")}
          />
          <CustomSimpleSelect
            options={categoriesData.topics}
            name='Topics'
            title={translate("topics_list_name")}
            defaultValueText={translate("all_topics")}
            onChangeValue={handleTopicsOnChange}
            selectedValue={filters.topics}
            ariaLabel={translate("topics_list_name")}
          />
        </div>

         {/* <div className={styles["sermons-filters__dates"]}>
            <CustomDatePicker
              className={styles["sermons-filters__date-picker"]}
              title={translate("start_dates_range")}
              selectedValue={filters.startDate}
              minDate={DEFAULT_SERMONS_FILTER_STATE.startDate}
              maxDate={filters.endDate}
              onChangeValue={handleStartDateOnChange}
              clearIcon={null}
              calendarAriaLabel="start date"
            />
            <CustomDatePicker
              className={styles["sermons-filters__date-picker"]}
              title={translate("end_dates_range")}
              selectedValue={filters.endDate}
              onChangeValue={handleEndDateOnChange}
              minDate={filters.startDate}
              maxDate={DEFAULT_SERMONS_FILTER_STATE.endDate}
              clearIcon={null}
              calendarAriaLabel="end date"
            />

            <Button
              className={styles["sermons-filters__reset-btn"]}
              buttonTitle={translate("reset")}
              onClick={resetFilters}
            />
         </div> */}
      </div>
    </Container>
  )
}

export default SermonFilters
