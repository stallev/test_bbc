import React from 'react';
import Image from 'next/image';
import { Text } from '../ui-kit';
import Audio from '../Audio/Audio';
import MediaGallery from '../MediaGallery/MediaGallery';
import FileDownload from '../FileDownload/FileDownload';
import Video from '../Video/Video';
import Blockquote from '../Blockquote/Blockquote';
import { GutenbergBlocksTypes } from '@/constants';

import styles from './styles/structured-markdown-content.module.scss';

interface StructuredMarkdownContentProps {
  className?: string
  content: [any]
}

const StructuredMarkdownContent:React.FC<StructuredMarkdownContentProps> = ({ className, content }) => {
  return (
    <div className={`${styles['structured-markdown-content']} ${className}`} >
      {content.map((block) => {
        switch (block.type) {
          case GutenbergBlocksTypes.paragraph:
            return <Text key={block.order} textType='p'>{block.content}</Text>;
          case 'heading':
            return <Text key={block.order} textType={block.headingType}>{block.content}</Text>
          case GutenbergBlocksTypes.image:
            return (
              <div key={block.order} className={styles['structured-markdown-content__single-image-wrap']}>
                <Image
                  fill
                  alt=''
                  sizes='50vw'
                  key={block.order}
                  src={block.src}
                />
              </div>
              );
          case GutenbergBlocksTypes.gallery:
            return <MediaGallery key={block.order} data={block.content} />;
          case GutenbergBlocksTypes.audio:
            return <Audio key={block.order} src={block.src} label={block?.caption && block.caption} />;
          case GutenbergBlocksTypes.file:
            return <FileDownload key={block.order} src={block.src} label={block?.label && block.label} />;
          case GutenbergBlocksTypes.video:
            return <Video key={block.order} src={block.src} label={block?.caption && block.caption} />;
          case GutenbergBlocksTypes.quote:
            return <Blockquote key={block.order} text={block.text} citation={block?.citation && block.citation} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default StructuredMarkdownContent;
