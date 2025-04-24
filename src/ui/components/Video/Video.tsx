import React from 'react';
import { Text } from '../ui-kit';
import { VideoProps } from './types';

import styles from './styles/video.module.scss';

const Video:React.FC<VideoProps> = ({
  src,
  label,
}) => {
  return (
    <div className={styles.video}>
      <div className={styles["video__video-wrap"]}>
        <iframe
          width="100%"
          height="100%"
          src={src}
        />
      </div>

      <Text
        textType='span'
        className={styles.video__caption}
      >
        {label}
      </Text>
    </div>
  )
}

export default Video
