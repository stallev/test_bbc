import React from 'react';
import YouTubePlayer from '@/ui/components/YouTubePlayer/YouTubePlayer';

import styles from './styles/videostreams-list.module.scss';

export interface VideoStreamsListProps {
  data: VideoItem[];
}

export interface VideoItem {
  title: string
  id: string
  url: string
}

const VideoStreamsList:React.FC<VideoStreamsListProps> = ({ data }) => {
  // console.log(data)
  if (typeof window === 'undefined') {
    return null; // или что-то другое, если нужно
  }
  
  return (
    <div className={styles['videostreams-list']}>
      {data.map((video: VideoItem) => <YouTubePlayer videoId={video.id} key={video.id} />)}
    </div>
  )
}

export default VideoStreamsList
