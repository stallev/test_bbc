import React, { useState } from 'react';
import cx from 'classnames';
import { TbSquare, TbSquareCheck } from "react-icons/tb";

import styles from './styles/checkbox.module.scss';

interface CheckboxProps {
  name: string
  isChecked: boolean
  inputType?: string
  onChangeSelectedValue?: () => void
  children?: React.ReactNode,
  className?: string
  classNameLabel?: string
}

const Checkbox = ({
  name,
  isChecked = false,
  inputType = 'checkbox',
  onChangeSelectedValue,
  children,
  className,
  classNameLabel,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <div
      className={cx(styles.checkbox, className)}
    >
      <input
        checked={checked}
        type={inputType}
        id={name}
        onChange={() => setChecked(!checked)}
        onClick={onChangeSelectedValue}
        role="checkbox"
        aria-checked="true"
        tabIndex={1}
      />
      <label
        className={cx(
          styles.checkbox__label,
          styles[`checkbox__label--${inputType}`],
          classNameLabel,
          {
            [styles['checkbox--checked']]: isChecked,
          },
        )}
        htmlFor={name}
      >
        {checked ? <TbSquareCheck /> : <TbSquare />}
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
