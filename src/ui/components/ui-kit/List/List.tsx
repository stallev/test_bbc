import React from 'react';
import { ParsedHTMLBlock } from '@/types/postTypes';
import { stripHtmlTags } from '@/utils/stripHtmlTags';
import styles from './styles/list.module.scss';

interface ListProps {
  block: ParsedHTMLBlock;
  className?: string;
}

const List = ({ block, className = '' }: ListProps) => {
  const { attributes, children } = block;
  const isOrdered = attributes.listType === 'ol';

  const ListTag = isOrdered ? 'ol' : 'ul';

  return (
    <ListTag className={`${styles.list} ${className}`}>
      {children.map((item, idx) => (
        <li key={item.order ?? idx} className={styles['list__item']}>
          {stripHtmlTags(item.filtered)}
        </li>
      ))}
    </ListTag>
  );
};

export default List;
