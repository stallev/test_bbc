import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { IoCloseCircle } from "react-icons/io5";
import { Text, Button } from '@/ui/components/ui-kit';


import styles from './styles/player.module.scss';
import 'react-h5-audio-player/src/styles.scss'


interface PlayerProps {
  trackName: string
  trackSrc: string
  onClose: () => void
}

const Player:React.FC<PlayerProps> = ({ trackName, trackSrc, onClose}) => {
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
          onClick={onClose}
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
