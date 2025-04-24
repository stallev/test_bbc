import React from 'react';

import BibleQuoteItem from './BibleQuoteItem/BibleQuoteItem';
import styles from './styles/bible-quotes-list.module.scss';
import { BibleQuotesListProps } from './types';

const BibleQuotesList = ({ quotes }: BibleQuotesListProps) => {
  return (
    <div className={styles['bible-quotes-list']}>
      {quotes.map((item, index) => (
        <BibleQuoteItem key={index} source={item.source} content={item.content} />
      ))}
    </div>
  );
};

export default BibleQuotesList;
