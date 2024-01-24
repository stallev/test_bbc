import React from 'react';
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import useTranslationFunction from '@/hooks/useTranslationFunction';

import styles from './styles/youtube-current-live-stream.module.scss';

interface YouTubeCurrentLiveStreamProps {
  url: string
  title?: string
}

const YouTubeCurrentLiveStream:React.FC<YouTubeCurrentLiveStreamProps> = ({ url, title }) => {
  const translate = useTranslationFunction();

  return (
    <div className={styles['youtube-current-live-stream']}>
      <iframe
        src={url}
        title={title || translate("current_stream")}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        data-src={url}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubeCurrentLiveStream;
