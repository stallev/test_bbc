import React from 'react';
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import { Text } from '../../../ui-kit';
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

import styles from './styles/youtube-player.module.scss';

interface YouTubePlayerProps {
  videoId: string
  title: string
}

const YouTubePlayer:React.FC<YouTubePlayerProps> = ({ videoId, title }) => {

  return (
    <div className={styles['youtube-player']}>
      <LiteYouTubeEmbed
        aspectHeight={9}
        aspectWidth={16}
        noCookie={true}
        id={videoId}
        title={title}
        webp={true}
      />
      <Text
        textType='p'
        className={styles['youtube-player__caption']}
      >
        {title}
      </Text>
    </div>
  )
}

export default YouTubePlayer;
