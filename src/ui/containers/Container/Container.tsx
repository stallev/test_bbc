import React from "react";
import cx from 'classnames';

import styles from "./styles/container.module.scss";

interface ContainerProps {
  children: React.ReactNode
  isMarkdownContent?: boolean
  isNarrowContent?: boolean
  className?: string
}

const Container: React.FC<ContainerProps> = ({
  children,
  isMarkdownContent = false,
  isNarrowContent = false,
  className = ''
}) => {
  return (
    <div className={cx(
      styles.container,
      className,
      {
        [styles['container--markdown-content']]: isMarkdownContent,
        [styles['container--narrow-content']]: isNarrowContent,
      },
    )}>
      {children}
    </div>
  );
};

export default Container;
