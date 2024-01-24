import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@/ui/components/ui-kit';
import YouTubePlayer from '@/ui/components/page-specific/live-streams/YouTubePlayer/YouTubePlayer';

import styles from './styles/videostreams-list.module.scss';

export interface VideoStreamsListProps {
  data: VideoItem[];
}

export interface VideoItem {
  title: string;
  id: string;
  url: string;
}

const VideoStreamsList: React.FC<VideoStreamsListProps> = ({ data }) => {
  const PLAYLIST_PORTION = 10;
  const [renderedData, setRenderedData] = useState(data.slice(0, PLAYLIST_PORTION));
  const [offset, setOffset] = useState(PLAYLIST_PORTION);

  const fetchMoreData = () => {
    const newData = data.slice(offset, offset + PLAYLIST_PORTION); 
    setRenderedData([...renderedData, ...newData]);
    setOffset(offset + PLAYLIST_PORTION);
  };

  return (
    <InfiniteScroll
      className={styles['videostreams-list']}
      dataLength={renderedData.length}
      next={fetchMoreData}
      hasMore={offset < data.length} 
      loader={<Loader />}
    >
      {renderedData.map((video: VideoItem) => (
        <YouTubePlayer
          videoId={video.id}
          title={video.title}
          key={video.id}
        />
      ))}
    </InfiniteScroll>
  );
};

export default VideoStreamsList;
