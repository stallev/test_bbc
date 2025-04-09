import React from 'react';

import styles from './styles/markdown-content.module.scss';

interface MarkdownContentProps {
  className?: string;
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ className, content }) => {
  return (
    // eslint-disable-next-line react/no-danger
    <div
      className={`${styles['markdown-content']} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MarkdownContent;
