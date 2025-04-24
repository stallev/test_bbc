import cx from 'classnames';
import React, { FC } from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';
import { Text } from '..';
import styles from './styles/custom-input.module.scss';

interface CustomInputProps {
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  label?: string;
  errorText?: string;
  isError?: boolean;
  validate?: UseFormRegisterReturn;
  placeholder: string;
  type?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  className,
  type = 'text',
  onClick,
  tabIndex = 0,
  label = '',
  errorText = '',
  validate,
  placeholder,
}) => {
  return (
    <div
      onClick={onClick || undefined}
      className={cx(styles['custom-input'], className, {
        [styles['custom-input--error']]: errorText,
      })}
    >
      {!!label ? (
        <label>
          {label}

          <input
            type={type}
            placeholder={placeholder}
            className={styles['custom-input__field']}
            tabIndex={tabIndex}
            {...validate}
          />
        </label>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={styles['custom-input__field']}
          tabIndex={tabIndex}
          {...validate}
        />
      )}

      {errorText && (
        <Text textType="p" className={styles['custom-input__error-message']}>
          {errorText && errorText}
        </Text>
      )}
    </div>
  );
};

export default CustomInput;
