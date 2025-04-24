import React from "react";
import cx from 'classnames';

import styles from "./styles/container.module.scss";

interface ContainerProps {
  children: React.ReactNode
  isMarkdownContent?: boolean
  className?: string
}

const Container: React.FC<ContainerProps> = ({
  children,
  isMarkdownContent = false,
  className = ''
}) => {
  return (
    <div className={cx(
      styles.container,
      className,
      {
        [styles['container--markdown-content']]: isMarkdownContent,
      },
    )}>
      {children}
    </div>
  );
};

export default Container;
