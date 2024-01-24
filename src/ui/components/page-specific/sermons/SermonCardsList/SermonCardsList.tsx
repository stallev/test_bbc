import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import SermonCard from '../SermonCard/SermonCard';

import styles from './styles/sermon-cards-list.module.scss';

import { SermonCardsListProps } from './types';
import { SermonCardProps } from '../SermonCard/types';

const Player = dynamic(() => import('../Player/Player'));

const SermonCardsList: React.FC<SermonCardsListProps> = ({ data }) => {
  const CARDS_PORTION = 10;
  
  const [renderedData, setRenderedData] = useState(data.slice(0, CARDS_PORTION));
  const [offset, setOffset] = useState(CARDS_PORTION);
  const [playingSermon, setPlayingSermon] = useState<SermonCardProps | null>(null);

  const onChangePlayingSermon = (sermon: SermonCardProps | null) => () => {
    setPlayingSermon(sermon);
  };

  const closePlayer = (sermon: SermonCardProps | null) => () => {
    setPlayingSermon(null);
  };

  const fetchMoreData = () => {
    const newData = data.slice(offset, offset + CARDS_PORTION); 
    setRenderedData([...renderedData, ...newData]);
    setOffset(offset + CARDS_PORTION);
  };

  useEffect(() => {
    setRenderedData(data.slice(0, CARDS_PORTION))
  }, [data])

  return (
    <>
      <Container>
        <InfiniteScroll
          className={styles['sermon-cards-list']}
          dataLength={renderedData.length}
          next={fetchMoreData}
          hasMore={offset < data.length} 
          loader={<Loader />}
        >
          {renderedData.map((item: SermonCardProps, index) => (
            <SermonCard
              key={index}
              data={item}
              index={index}
              onChangePlayingSermon={onChangePlayingSermon(item)}
              stopPlayingSermon={closePlayer(null)}
              isActive={playingSermon === item}
            />
          ))}
        </InfiniteScroll>
      </Container>

      {
        playingSermon?.sermonAudio && 
          <Player
            onClose={closePlayer(null)}
            trackName={playingSermon?.title}
            trackSrc={playingSermon?.sermonAudio}
          />
      }
    </>
  );
};

export default SermonCardsList;
