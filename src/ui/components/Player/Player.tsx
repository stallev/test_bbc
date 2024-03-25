import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { useUpdatePlayerInformation } from '@/hooks/useUpdatePlayerInformation';
import { IoCloseCircle } from "react-icons/io5";
import { Text, Button } from '@/ui/components/ui-kit';
import { PlayerProps } from './types';

import styles from './styles/player.module.scss';
import 'react-h5-audio-player/src/styles.scss'

const Player:React.FC<PlayerProps> = ({ trackName, trackSrc}) => {
  const setActiveSermon = useUpdatePlayerInformation();

  const onStopSermonPlaying = () => {
    setActiveSermon({
      isVisiblePlayer: false,
      trackName: '',
      trackSrc: '',
    });
  };
  return (
    <div className={styles.player}>
      <div className={styles.player__header}>
        <Text
          textType='p'
          className={styles["player__track-name"]}
        >
          {trackName}
        </Text>

        <Button
          onClick={onStopSermonPlaying}
          className={styles["player__close-button"]}
        >
          <IoCloseCircle />
        </Button>
      </div>
      <AudioPlayer
        className={styles.player__body}
        autoPlay
        src={trackSrc}
      />
    </div>
  )
}

export default Player
