import cx from 'classnames';
import React from 'react';

import styles from './styles/container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  isMarkdownContent?: boolean;
  isNarrowContent?: boolean;
  isSliderContent?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  isMarkdownContent = false,
  isNarrowContent = false,
  isSliderContent = false,
  className = '',
}) => {
  return (
    <div
      className={cx(styles.container, className, {
        [styles['container--markdown-content']]: isMarkdownContent,
        [styles['container--narrow-content']]: isNarrowContent,
        [styles['container--slider-content']]: isSliderContent,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
