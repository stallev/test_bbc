'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import { GutenbergBlocksTypes } from '@/constants';
import { DefaultTextFontSizes } from '@/constants/TextConstants';
import { ConvertedGutenbergBlockType } from '@/types/WPDataTypes/GutenbergBlocksTypes';

import Audio from '../Audio/Audio';
import Blockquote from '../Blockquote/Blockquote';
import FileDownload from '../FileDownload/FileDownload';
import MediaGallerySlider from '../MediaGallerySlider/MediaGallerySlider';
import { CustomImage, Text } from '../ui-kit';
import Video from '../Video/Video';
import styles from './styles/structured-markdown-content.module.scss';

const ResizingFontButtons = dynamic(() => import('./ResizingFontButtons/ResizingFontButtons'));
interface StructuredMarkdownContentProps {
  className?: string;
  content: ConvertedGutenbergBlockType[];
  isFontSizeResizable?: boolean;
}

const StructuredMarkdownContent: React.FC<StructuredMarkdownContentProps> = ({
  className,
  content,
  isFontSizeResizable = true,
}) => {
  const [currentBlocksFontSizes, setCurrentBlocksFontSizes] = useState(DefaultTextFontSizes.mobile);

  return (
    <div className={`${styles['structured-markdown-content']} ${className}`}>
      {isFontSizeResizable && (
        <ResizingFontButtons setCurrentBlocksFontSizes={setCurrentBlocksFontSizes} />
      )}

      <div className={styles['structured-markdown-content__blocks']}>
        {content.map((block: ConvertedGutenbergBlockType) => {
          switch (block.type) {
            case GutenbergBlocksTypes.paragraph:
              return (
                <Text
                  key={block.order}
                  textType="p"
                  fontSize={
                    isFontSizeResizable ? currentBlocksFontSizes && currentBlocksFontSizes.p : null
                  }
                >
                  {typeof block.content === 'string' ? block.content : ''}
                </Text>
              );
            case 'heading':
              return (
                <Text
                  key={block.order}
                  textType={block?.headingType ? block?.headingType : ''}
                  fontSize={
                    isFontSizeResizable
                      ? currentBlocksFontSizes &&
                        currentBlocksFontSizes[
                          block.headingType as keyof typeof currentBlocksFontSizes
                        ]
                      : null
                  }
                >
                  {typeof block.content === 'string' ? block.content : ''}
                </Text>
              );
            case GutenbergBlocksTypes.image:
              return (
                <CustomImage
                  key={block.order}
                  className={styles['structured-markdown-content__single-image-wrap']}
                  sizes="80vw"
                  alt=""
                  imageURL={block?.src ? block?.src : ''}
                />
              );
            case GutenbergBlocksTypes.gallery:
            case GutenbergBlocksTypes.gallery:
              return Array.isArray(block.content) ? (
                <MediaGallerySlider key={block.order} data={block.content} />
              ) : null;
            case GutenbergBlocksTypes.audio:
              return (
                <Audio
                  key={block.order}
                  src={block?.src ? block?.src : ''}
                  label={block?.caption && block.caption}
                />
              );
            case GutenbergBlocksTypes.file:
              return (
                <FileDownload
                  key={block.order}
                  src={block?.src ? block?.src : ''}
                  label={block?.label ? block?.label : ''}
                />
              );
            case GutenbergBlocksTypes.video:
              return (
                <Video
                  key={block.order}
                  src={block?.src ? block?.src : ''}
                  label={block?.caption && block.caption}
                />
              );
            case GutenbergBlocksTypes.list:
              return typeof block.content === 'string' ? (
                <div key={block.order} dangerouslySetInnerHTML={{ __html: block.content }}></div>
              ) : null;
            case GutenbergBlocksTypes.quote:
              return (
                <Blockquote
                  key={block.order}
                  text={block?.text ? block?.text : ''}
                  citation={block?.citation && block.citation}
                  fontSize={
                    isFontSizeResizable
                      ? currentBlocksFontSizes && currentBlocksFontSizes.blockquote
                      : null
                  }
                  className={styles['structured-markdown-content__blockquote']}
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
