import React from 'react';
import { useRouter } from 'next/router';
import YouTube, { YouTubeProps } from 'react-youtube';

import styles from './styles/yotube-player.module.scss';

interface YouTubePlayerProps {
  videoId: string
}

const YouTubePlayer:React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const { locale } = useRouter();
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      enablejsapi: 1,
      hl: locale,
      widget_referrer: window.location.href,
      origin:window.location.href,
      // cc_lang_pref: locale,
    },
  };

  return <YouTube
    className={styles['youtube-player']}
    videoId={videoId}
    opts={opts}
    onReady={onPlayerReady}
  />;
}

export default YouTubePlayer;
