'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { GutenbergBlocksTypes } from '@/constants';
import { DefaultTextFontSizes } from '@/constants/TextConstants';
import { ParsedHTMLBlock } from '@/types/postTypes';
import List from '@/ui/components/ui-kit/List/List';
import Preformatted from '@/ui/components/ui-kit/Preformatted/Preformatted';
import Blockquote from '../Blockquote/Blockquote';
import { CustomImage, Text } from '../ui-kit';
import styles from './styles/structured-markdown-content.module.scss';

const ResizingFontButtons = dynamic(() => import('./ResizingFontButtons/ResizingFontButtons'));
interface StructuredMarkdownContentProps {
  className?: string;
  content: ParsedHTMLBlock[];
  isFontSizeResizable?: boolean;
}

const StructuredMarkdownContent = ({
  className,
  content,
  isFontSizeResizable = true,
}: StructuredMarkdownContentProps) => {
  const [currentBlocksFontSizes, setCurrentBlocksFontSizes] = useState(DefaultTextFontSizes.mobile);

  return content.length > 0 ? (
    <div className={`${styles['structured-markdown-content']} ${className}`}>
      {isFontSizeResizable && (
        <ResizingFontButtons setCurrentBlocksFontSizes={setCurrentBlocksFontSizes} />
      )}

      <div className={styles['structured-markdown-content__blocks']}>
        {content.map((block: ParsedHTMLBlock) => {
          switch (block.name) {
            case GutenbergBlocksTypes.paragraph:
              return (
                <Text
                  key={block.order}
                  textType="p"
                  fontSize={
                    isFontSizeResizable ? currentBlocksFontSizes && currentBlocksFontSizes.p : null
                  }
                >
                  {block.filtered}
                </Text>
              );
            case 'heading':
              return (
                <Text
                  key={block.order}
                  textType={`h${block.attributes.headingType}`}
                  fontSize={
                    isFontSizeResizable
                      ? currentBlocksFontSizes &&
                        currentBlocksFontSizes[
                          `h${block.attributes.headingType}` as keyof typeof currentBlocksFontSizes
                        ]
                      : null
                  }
                >
                  {typeof block.filtered === 'string' ? block.filtered : ''}
                </Text>
              );
            case GutenbergBlocksTypes.image:
              return (
                <CustomImage
                  key={block.order}
                  className={styles['structured-markdown-content__single-image-wrap']}
                  sizes="80vw"
                  alt=""
                  imageURL={block?.attributes.url ? block?.attributes.url : ''}
                />
              );
            case GutenbergBlocksTypes.quote:
              return (
                <Blockquote
                  key={block.order}
                  text={block?.attributes.quoteText ? block?.attributes.quoteText : ''}
                  citation={block?.attributes.cite && block.attributes.cite}
                  fontSize={
                    isFontSizeResizable
                      ? currentBlocksFontSizes && currentBlocksFontSizes.blockquote
                      : null
                  }
                  className={styles['structured-markdown-content__blockquote']}
                />
              );
            case GutenbergBlocksTypes.list:
              return (
                <List
                  key={block.order}
                  block={block}
                  className={styles['structured-markdown-content__list']}
                />
              );
            case GutenbergBlocksTypes.preformatted:
              return (
                <Preformatted
                  key={block.order}
                  block={block}
                  className={styles['structured-markdown-content__preformatted']}
                />
              );
            case GutenbergBlocksTypes.code:
              return (
                <Preformatted
                  key={block.order}
                  block={block}
                  preformattedType={GutenbergBlocksTypes.code}
                  className={styles['structured-markdown-content__code']}
                />
              );
            case GutenbergBlocksTypes.verse:
              return (
                <Preformatted
                  key={block.order}
                  block={block}
                  preformattedType={GutenbergBlocksTypes.verse}
                  className={styles['structured-markdown-content__verse']}
                />
              );
            case GutenbergBlocksTypes.separator:
              return <hr key={block.order} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  ) : null;
};

export default StructuredMarkdownContent;
