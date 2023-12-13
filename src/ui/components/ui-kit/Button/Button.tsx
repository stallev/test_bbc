import React, { FC } from 'react';
import cx from 'classnames';

import styles from './styles/button.module.scss';

interface CustomButtonProps {
  buttonTitle: string,
  className: string,
  isSubmit?: boolean,
  onClick?: () => void,
  background?: string,
  disabled: string | undefined,
  tabIndex?: number,
}

const Button: FC<CustomButtonProps> = ({
  buttonTitle,
  className,
  isSubmit,
  onClick,
  background,
  tabIndex = 0,
}) => {
  return (
    <button
      className={cx(styles['custom-button'], styles[`custom-button--${background}`], className)}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick || undefined}
      tabIndex={tabIndex}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
