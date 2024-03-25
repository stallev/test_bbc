import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import SermonCard from '../SermonCard/SermonCard';

import styles from './styles/sermon-cards-list.module.scss';

import { SermonCardsListProps } from './types';
import { SermonCardProps } from '../SermonCard/types';

const SermonCardsList: React.FC<SermonCardsListProps> = ({ data, fetchMoreData, hasMore }) => {
  return (
    <>
      <Container>
        <InfiniteScroll
          className={styles['sermon-cards-list']}
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore} 
          loader={<Loader />}
        >
          {data.map((item: SermonCardProps) => (
            <SermonCard
              key={item.sermonAudio}
              data={item}
            />
          ))}
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default SermonCardsList;
