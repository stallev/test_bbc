import React, { useState, useEffect } from 'react';

import { DefaultTextFontSizes } from '@/constants/TextConstants';
import useTranslationFunction from '@/hooks/useTranslationFunction';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { isTabletWindowSize } from '@/hooks/useWindowSizeType';

import styles from './styles/resizing-font-buttons.module.scss';
import { ResizingFontButtonsProps } from './types';

const ResizingFontButtons: React.FC<ResizingFontButtonsProps> = ({ setCurrentBlocksFontSizes }) => {
  const [fontResizeValue, setFontResizeValue] = useState(1);
  const translate = useTranslationFunction();
  const { width } = useWindowDimensions();

  const RESIZE_STEP = 0.2;
  const RESIZE_MIN_VALUE = 0.6;
  const RESIZE_MAX_VALUE = 2;

  const increaseFontSize = () => {
    if (parseFloat(fontResizeValue.toFixed(1)) < RESIZE_MAX_VALUE) {
      setFontResizeValue(fontResizeValue + RESIZE_STEP);
    }
  };

  const decreaseFontSize = () => {
    if (parseFloat(fontResizeValue.toFixed(1)) > RESIZE_MIN_VALUE) {
      setFontResizeValue(fontResizeValue - RESIZE_STEP);
    }
  };

  const resetFontSize = () => {
    setFontResizeValue(1);
  };

  useEffect(() => {
    const defaultFontSizes = !isTabletWindowSize(width)
      ? DefaultTextFontSizes.tablet
      : DefaultTextFontSizes.mobile;
    const changedFontSizesData = { ...defaultFontSizes };
    const keys = Object.keys(defaultFontSizes) as (keyof typeof defaultFontSizes)[];

    for (const key of keys) {
      changedFontSizesData[key] = defaultFontSizes[key] * fontResizeValue;
    }

    setCurrentBlocksFontSizes(changedFontSizesData);
  }, [width, fontResizeValue, setCurrentBlocksFontSizes]);

  return (
    <div className={styles['resizing-font-buttons']}>
      <button
        className={styles['resizing-font-buttons__font-button']}
        tabIndex={0}
        aria-label="decrease font size of the content"
        onClick={decreaseFontSize}
      >
        A-
      </button>

      <button
        className={styles['resizing-font-buttons__font-button']}
        tabIndex={0}
        aria-label="increase font size of the content"
        onClick={increaseFontSize}
      >
        A+
      </button>

      <button
        className={styles['resizing-font-buttons__font-button']}
        tabIndex={0}
        aria-label="reset font size of the content"
        onClick={resetFontSize}
      >
        {translate('reset')}
      </button>
    </div>
  );
};

export default ResizingFontButtons;
