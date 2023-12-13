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
  console.log(data)
  return (
    <div className={styles['videostreams-list']}>
      {data.map((video: VideoItem) => <YouTubePlayer videoId={video.id} key={video.id} />)}
      {/* {data.map((video: VideoItem) => <iframe key={video.id} width="420" height="315"
src={video.url}>
</iframe>)} */}
    </div>
  )
}

export default VideoStreamsList
