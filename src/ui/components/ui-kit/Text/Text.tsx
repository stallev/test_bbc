import React, { FC, HTMLProps, MouseEvent } from 'react';

import styles from './styles/text.module.scss';

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' ;
type TextType = Headings | 'p' | 'span';

interface TextProps extends HTMLProps<HTMLElement> {
  fontSize?: number
  textType: string;
  onHover?: () => void;
}

const isTextTypeList = (type: string): type is Headings => {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'span'].includes(type);
};

const Text: FC<TextProps> = ({
  fontSize,
  textType,
  children,
  className,
  onClick,
  onHover,
}) => {
  const Element: TextType = isTextTypeList(textType) ? textType : 'p';

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
