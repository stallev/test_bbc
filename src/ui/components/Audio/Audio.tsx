import React, { useContext } from 'react';
import { FiPlay, FiDownload, FiStopCircle } from 'react-icons/fi';
import { useUpdatePlayerInformation } from '@/hooks/useUpdatePlayerInformation';
import { AppContext } from '@/ui/globalState/AppContext';
import { useDownloadClick } from '@/hooks/useDownloadClick';

import styles from './styles/audio.module.scss';

interface AudioProps {
  src: string;
  label: string;
}

const Audio: React.FC<AudioProps> = ({ src, label }) => {
  const setAudioTrackPlaying = useUpdatePlayerInformation();
  const { state: { playerData: { trackSrc } } } = useContext(AppContext);

  const isPlaying = trackSrc === src;

  const onChangeAudioTrackPlaying = () => {
    setAudioTrackPlaying({
      isVisiblePlayer: true,
      trackName: label,
      trackSrc: src,
    });
  };

  const onStopAudioTrackPlaying = () => {
    setAudioTrackPlaying({
      isVisiblePlayer: false,
      trackName: '',
      trackSrc: '',
    });
  };

  const handleDownloadClick = useDownloadClick({ src, label });

  return (
    <div className={styles.audio}>
      <p className={styles.audio__label}>{label}</p>
      
      <div className={styles.audio__buttons}>
        <button
          className={styles["audio__play-icon"]}
          onClick={isPlaying ? onStopAudioTrackPlaying : onChangeAudioTrackPlaying}
          tabIndex={0}
        >
          {isPlaying ? <FiStopCircle /> : <FiPlay />}
        </button>
        
        <button
          className={styles["audio__download-icon"]}
          onClick={handleDownloadClick}
          tabIndex={0}
        >
          <FiDownload />
        </button>
      </div>
    </div>
  );
};

export default Audio;
