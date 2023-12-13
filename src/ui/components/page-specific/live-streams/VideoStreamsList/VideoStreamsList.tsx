import React from 'react';
import YouTubePlayer from '@/ui/components/YouTubePlayer/YouTubePlayer';
import ReactPlayer from 'react-player/youtube'

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
  return (
    <div className={styles['videostreams-list']}>
      {data.map((video: VideoItem) => <ReactPlayer url={video.url} key={video.id} />)}
    </div>
  )
}

export default VideoStreamsList
