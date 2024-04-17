import React, { FC, HTMLProps, MouseEvent } from 'react';

import styles from './styles/text.module.scss';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
type TextType = HeadingType | 'p' | 'span';

interface TextProps extends HTMLProps<HTMLElement> {
  fontSize?: number
  textType: TextType;
  onHover?: () => void;
}

const Text: FC<TextProps> = ({
  fontSize,
  textType,
  children,
  className,
  onClick,
  onHover,
}) => {
  const Element: TextType = textType;

  const handleHover = (event: MouseEvent<HTMLElement>) => {
    if (onHover) {
      onHover();
    }
  };

  return React.createElement(
    Element,
    { 
      className: `text ${className} ${styles[`text--${textType}`]}`,
      onClick,
      onMouseEnter: handleHover,
      style: fontSize && { fontSize: `${fontSize}px` } 
    },
    children
  );
};

export default Text;
