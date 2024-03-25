import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import MediaSlider from '../MediaSlider/MediaSlider';
import { MediaGalleryProps, MediaGalleryItemProps } from './types';

import styles from './styles/media-gallery.module.scss';

const MediaGallery:React.FC<MediaGalleryProps> = ({ data }) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [activeMediaItem, setActiveMediaItem] = useState<MediaGalleryItemProps>(data[0]);

  const onShowMediaSlider = (mediaItem:MediaGalleryItemProps) => () => {
    setActiveMediaItem(mediaItem);
    setIsModalShow(true);
  };

  const onHideMediaSlider = () => {
    setIsModalShow(false);
    setActiveMediaItem(data[0]);
  };

  const onChangeActiveMediaItem = (mediaItem: MediaGalleryItemProps) => () => {
    setActiveMediaItem(mediaItem);
  };

  return (
    <div className={styles["media-gallery"]}>
      {data.map((block) => {
        switch (block.type) {
          case 'image':
            return (
              <div
                key={block.order}
                className={styles['media-gallery__single-image-wrap']}
                onClick={onShowMediaSlider(block)}
              >
                <Image
                  fill
                  alt=''
                  sizes='30vw'
                  key={block.order}
                  src={block.src}
                />
              </div>
              );
          default:
            return null;
        }
      })}

      <Modal
        isModalShow={isModalShow}
        onHide={onHideMediaSlider}
        isMediaGallery
        isSemitransparent
      >
        <MediaSlider
          data={data}
          activeMediaItem={activeMediaItem}
          setActiveMediaItem={setActiveMediaItem}
        />
      </Modal>
    </div>
  )
}

export default MediaGallery
