import React from 'react';
import { BlockquoteProps } from './types';

import styles from './styles/blockquote.module.scss';

const Blockquote:React.FC<BlockquoteProps> = ({
  text,
  citation ='',
}) => {
  return (
    <blockquote className={styles.blockquote}>
      <p>{text}</p>
      
      <cite>{citation}</cite>
    </blockquote>
  )
}

export default Blockquote
