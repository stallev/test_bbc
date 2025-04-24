'use client';

import { FC, HTMLProps, createElement } from 'react';

import styles from './styles/text.module.scss';

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
type TextType = Headings | 'p' | 'span';

interface TextProps extends HTMLProps<HTMLElement> {
  fontSize?: number | null;
  textType: string;
  onHover?: () => void;
}

const isTextTypeList = (type: string): type is Headings => {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'span'].includes(type);
};

const Text: FC<TextProps> = ({ fontSize, textType, children, className, onClick, onHover }) => {
  const Element: TextType = isTextTypeList(textType) ? textType : 'p';

  const handleHover = () => {
    if (onHover) {
      onHover();
    }
  };

  return createElement(
    Element,
    {
      className: `text ${className} ${styles[`text--${textType}`]}`,
      onClick,
      onMouseEnter: handleHover,
      style: fontSize && { fontSize: `${fontSize}px` },
    },
    children
  );
};

export default Text;
