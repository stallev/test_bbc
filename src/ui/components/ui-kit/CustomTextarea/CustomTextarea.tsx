import React, { FC } from 'react';
import cx from 'classnames';
import { Text } from '..';

import styles from './styles/custom-textarea.module.scss';

interface CustomTextareaProps {
  className?: string,
  onClick?: () => void,
  tabIndex?: number,
  errorText?: string,
  label?: string
  isError?: boolean,
  validate?: any,
  placeholder: string
}

const CustomTextarea: FC<CustomTextareaProps> = ({
  className,
  onClick,
  tabIndex = 0,
  errorText = '',
  label = '',
  validate,
  placeholder,
}) => {
  return (
    <div
      onClick={onClick || undefined}
      className={cx(
        styles['custom-textarea'],
        className,
        {
          [styles['custom-textarea--error']]: errorText,
        }
      )}
    >
      {!!label
        ? <label>
          {label}
          <textarea
            rows={5}
            placeholder={placeholder}
            className={styles['custom-textarea__field']}
            tabIndex={tabIndex}
            {...validate}
          />
        </label>
        : <textarea
          rows={5}
          placeholder={placeholder}
          className={styles['custom-textarea__field']}
          tabIndex={tabIndex}
          {...validate}
        />}

      {errorText && <Text
        textType='p'
        className={styles['custom-textarea__error-message']}
      >
        {errorText && errorText}
      </Text>}
    </div>
  );
};

export default CustomTextarea;
