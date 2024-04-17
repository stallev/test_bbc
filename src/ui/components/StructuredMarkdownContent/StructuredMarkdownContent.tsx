import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Text } from '../ui-kit';
import Audio from '../Audio/Audio';
import MediaGallery from '../MediaGallery/MediaGallery';
import FileDownload from '../FileDownload/FileDownload';
import Video from '../Video/Video';
import Blockquote from '../Blockquote/Blockquote';
import { GutenbergBlocksTypes } from '@/constants';
import { DefaultTextFontSizes } from '@/constants/TextConstants';

import styles from './styles/structured-markdown-content.module.scss';

const ResizingFontButtons = dynamic(
  () => import("./ResizingFontButtons/ResizingFontButtons")
);
interface StructuredMarkdownContentProps {
  className?: string
  content: [any]
  isFontSizeResizable?: boolean
}

const StructuredMarkdownContent:React.FC<StructuredMarkdownContentProps> = ({ 
  className,
  content,
  isFontSizeResizable = true 
}) => {
  const [currentBlocksFontSizes, setCurrentBlocksFontSizes] = useState(DefaultTextFontSizes.mobile);
  return (
    <div className={`${styles['structured-markdown-content']} ${className}`}>
      {
        isFontSizeResizable &&
          <ResizingFontButtons
            setCurrentBlocksFontSizes={setCurrentBlocksFontSizes}
          />
      }

      <div className={styles['structured-markdown-content__blocks']} >
        {content.map((block) => {
          switch (block.type) {
            case GutenbergBlocksTypes.paragraph:
              return (
                <Text
                  key={block.order}
                  textType='p'
                  fontSize={currentBlocksFontSizes && currentBlocksFontSizes.p}
                >
                  {block.content}
                </Text>
              );
            case 'heading':
              return (
                <Text
                  key={block.order}
                  textType={block.headingType}
                  fontSize={
                    currentBlocksFontSizes && currentBlocksFontSizes[block.headingType as keyof typeof currentBlocksFontSizes]
                  }
                >
                  {block.content}
                </Text>
              )
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
              return (
                <Blockquote
                  key={block.order}
                  text={block.text}
                  citation={block?.citation && block.citation}
                  fontSize={currentBlocksFontSizes && currentBlocksFontSizes.blockquote}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default StructuredMarkdownContent;
