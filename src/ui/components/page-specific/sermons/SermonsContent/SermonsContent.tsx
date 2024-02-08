import React, { useState, useEffect } from 'react';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import Container from '@/ui/containers/Container/Container';
import { Text } from '@/ui/components/ui-kit';
import SermonCardsList from '../SermonCardsList/SermonCardsList';
import SermonFilters from '../SermonFilters/SermonFilters';
import { SermonsContentProps, SermonsListProps } from './types';
import { DEFAULT_SERMONS_FILTER_STATE } from '@/constants/mock';
import { SermonsFiltersProps } from '../SermonFilters/types';

import styles from './styles/sermons-content.module.scss';
import MarkdownContent from '@/ui/components/MarkdownContent/MarkdownContent';

const CARDS_PORTION = 10;

const SermonsContent:React.FC<SermonsContentProps> = ({ contentData, sermonsData, sermonsCategories }) => {
  console.log(contentData)
  const translate = useTranslationFunction();

  const [sermons, setSermons] = useState<SermonsListProps>({
    currentSermons: sermonsData.slice(0, CARDS_PORTION),
    searchedSermons: [],
  });
  const [filters, setFilters] = useState<SermonsFiltersProps>(DEFAULT_SERMONS_FILTER_STATE);

  const [offset, setOffset] = useState(CARDS_PORTION);

  const isActiveSearchedSermons = filters != DEFAULT_SERMONS_FILTER_STATE;

  const searchedSermonsMessage = isActiveSearchedSermons && !!sermons.searchedSermons.length
    ? translate("yes_searched_sermons") + sermons.searchedSermons.length.toString()
    : translate("no_searched_sermons");

  const fetchMoreData = () => {
    const newData = sermonsData.slice(offset, offset + CARDS_PORTION); 
    setSermons({
      ...sermons,
      currentSermons: [...sermons.currentSermons, ...newData]
    });
    setOffset(offset + CARDS_PORTION);
  };

  useEffect(() => {
    setSermons({
      currentSermons: sermonsData.slice(0, CARDS_PORTION),
      searchedSermons: [],
    });

  }, [sermonsData])

  useEffect(() => {
    console.log(filters)
  }, [filters])

  return (
    <div className={styles["sermons-content"]}>
      <SermonFilters
        categoriesData={sermonsCategories}
        fullSermonsList={sermonsData}
        filters={filters}
        setFilters={setFilters}
        setSermons={setSermons}
        sermons={sermons}
      />

      <Container isMarkdownContent>
        <MarkdownContent
          content={contentData}
        />
      </Container>

      {
        isActiveSearchedSermons &&
          <Container>
            <Text textType='p'>{searchedSermonsMessage}</Text>
          </Container>
      }
      
      <SermonCardsList
        fetchMoreData={fetchMoreData}
        data={!isActiveSearchedSermons ? sermons.currentSermons : sermons.searchedSermons}
        hasMore={offset < sermonsData.length}
      />
    </div>
  )
}

export default SermonsContent;
