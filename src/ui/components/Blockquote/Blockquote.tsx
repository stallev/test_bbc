import React from 'react';

import { DefaultParagraphFontSize } from '@/constants/TextConstants';
import { Icon } from '@/ui/components/ui-kit';
import { stripHtmlTags } from '@/utils';

import styles from './styles/blockquote.module.scss';
import { BlockquoteProps } from './types';

const Blockquote: React.FC<BlockquoteProps> = ({
  text,
  citation = '',
  fontSize = DefaultParagraphFontSize,
  className = '',
}) => {
  return (
    <blockquote className={`${styles.blockquote} ${!!className ? className : ''}`}>
      <div className={styles.blockquote__content}>
        <Icon iconName="customQuotes" className={styles.blockquote__quotes} />

        <p
          className={styles['blockquote__content-paragraph']}
          style={fontSize ? { fontSize: `${fontSize}px` } : {}}
        >
          {stripHtmlTags(text)}
        </p>

        <Icon
          iconName="customQuotes"
          className={`${styles.blockquote__quotes} ${styles['blockquote__quotes--right']}`}
        />
      </div>

      <cite className={styles['blockquote__content-cite']}>{stripHtmlTags(citation)}</cite>
    </blockquote>
  );
};

export default Blockquote;
