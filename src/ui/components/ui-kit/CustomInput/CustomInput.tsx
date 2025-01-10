import React, { FC } from 'react';
import cx from 'classnames';
import { Text } from '..';
import { InputTypes } from '@/constants';

import styles from './styles/custom-input.module.scss';

interface CustomInputProps {
  className?: string,
  onClick?: () => void,
  tabIndex?: number,
  errorText?: string,
  isError?: boolean,
  validate?: any,
  placeholder: string
  type?: string
}

const CustomInput: FC<CustomInputProps> = ({
  className,
  type = "text",
  onClick,
  tabIndex = 0,
  errorText = '',
  validate,
  placeholder,
}) => {
  return (
    <div
      onClick={onClick || undefined}
      className={cx(
        styles['custom-input'],
        className,
        {
          [styles['custom-input--error']]: errorText,
        }
      )}
    >
      <input
        type={type}
        placeholder={placeholder}
        className={styles['custom-input__field']}
        tabIndex={tabIndex}
        {...validate}
      />
      
      {errorText && <Text
        textType='p'
        className={styles['custom-input__error-message']}
      >
        {errorText && errorText}
      </Text>}
    </div>
  );
};

export default CustomInput;
