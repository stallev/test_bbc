import React, { FC, HTMLProps } from 'react';

import styles from './styles/text.module.scss';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
type TextType = HeadingType | 'p' | 'span';

interface TextProps extends HTMLProps<HTMLElement> {
  textType: TextType;
}

const Text: FC<TextProps> = ({
  textType,
  children,
  className,
  onClick }) => {
  const Element: TextType = textType;

  return React.createElement(
    Element,
    { className: `text ${className} ${styles[`text--${textType}`]}`, onClick },
    children
  );
};

export default Text;
