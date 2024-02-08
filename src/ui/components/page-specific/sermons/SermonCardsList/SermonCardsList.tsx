import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/ui/components/ui-kit';
import Container from '@/ui/containers/Container/Container';
import SermonCard from '../SermonCard/SermonCard';

import styles from './styles/sermon-cards-list.module.scss';

import { SermonCardsListProps } from './types';
import { SermonCardProps } from '../SermonCard/types';

const Player = dynamic(() => import('../Player/Player'));

const SermonCardsList: React.FC<SermonCardsListProps> = ({ data, fetchMoreData, hasMore }) => {
  const [playingSermon, setPlayingSermon] = useState<SermonCardProps | null>(null);

  const onChangePlayingSermon = (sermon: SermonCardProps | null) => () => {
    setPlayingSermon(sermon);
  };

  const closePlayer = (sermon: SermonCardProps | null) => () => {
    setPlayingSermon(null);
  };

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
          {data.map((item: SermonCardProps, index) => (
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
