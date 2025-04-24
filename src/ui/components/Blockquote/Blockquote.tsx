import React from 'react';
import { stripHtmlTags } from '@/utils';
import { DefaultParagraphFontSize } from '@/constants/TextConstants';
import { BlockquoteProps } from './types';

import styles from './styles/blockquote.module.scss';

const Blockquote:React.FC<BlockquoteProps> = ({
  text,
  citation ='',
  fontSize = DefaultParagraphFontSize,
}) => {
  return (
    <blockquote
      style={{ fontSize: `${fontSize}px` }}
      className={styles.blockquote}
    >
      <p style={{ fontSize: `${fontSize}px` }}>{stripHtmlTags(text)}</p>
      
      <cite>{stripHtmlTags(citation)}</cite>
    </blockquote>
  )
}

export default Blockquote
