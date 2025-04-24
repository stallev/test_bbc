import React from 'react';
import { Text } from '../../ui-kit';
import { BibleQuoteItemProps } from '../../BibleQuotesList/types';

import styles from "./styles/bible-quote-item.module.scss";


const BibleQuoteItem = ({ source, content }: BibleQuoteItemProps) => {
  return (
    <div className={styles["bible-quote-item"]}>
      <Text
        textType='span'
        className={styles["bible-quote-item__source"]}
      >
        {source}
      </Text>

      <Text
        textType='p'
        className={styles["bible-quote-item__content"]}
      >
        {content}
      </Text>
    </div>
  )
}

export default BibleQuoteItem
