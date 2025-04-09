'use client';

import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { IoCloseCircle } from 'react-icons/io5';

import { useUpdatePlayerInformation } from '@/hooks/useUpdatePlayerInformation';
import { Text, Button } from '@/ui/components/ui-kit';
import { useAppContext } from '@/ui/globalState/ContextHook/contextHook';

import styles from './styles/player.module.scss';
import 'react-h5-audio-player/src/styles.scss';

const Player: React.FC = () => {
  const setActiveSermon = useUpdatePlayerInformation();
  const { state } = useAppContext();

  const onStopSermonPlaying = () => {
    setActiveSermon({
      isVisiblePlayer: false,
      trackName: '',
      trackSrc: '',
    });
  };
  return (
    state.playerData.isVisiblePlayer && (
      <div className={styles.player}>
        <div className={styles.player__header}>
          <Text textType="p" className={styles['player__track-name']}>
            {state.playerData.trackName}
          </Text>

          <Button onClick={onStopSermonPlaying} className={styles['player__close-button']}>
            <IoCloseCircle />
          </Button>
        </div>
        <AudioPlayer className={styles.player__body} autoPlay src={state.playerData.trackSrc} />
      </div>
    )
  );
};

export default Player;
