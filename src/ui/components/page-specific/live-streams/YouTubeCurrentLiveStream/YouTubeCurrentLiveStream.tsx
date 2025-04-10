import React from 'react';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import styles from './styles/youtube-current-live-stream.module.scss';

interface YouTubeCurrentLiveStreamProps {
  data: {
    url: string;
    title?: string;
  };
}

const YouTubeCurrentLiveStream: React.FC<YouTubeCurrentLiveStreamProps> = ({ data }) => {
  return (
    <div className={styles['youtube-current-live-stream']}>
      <iframe
        src={data.url}
        title={data.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        data-src={data.url}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeCurrentLiveStream;
