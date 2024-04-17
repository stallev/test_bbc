import React, { FC } from 'react';

import styles from './styles/button.module.scss';

interface CustomButtonProps {
  buttonTitle?: string,
  className?: string,
  isSubmit?: boolean,
  onClick?: () => void,
  type?: string,
  disabled?: boolean,
  tabIndex?: number,
  children?: React.ReactNode
}

const Button: FC<CustomButtonProps> = ({
  buttonTitle,
  className,
  isSubmit = false,
  onClick,
  type,
  tabIndex = 0,
  children,
  disabled = false,
}) => {
  return (
    <button
      className={`
        ${styles['custom-button']}
        ${styles[`custom-button--${type}`]}
        ${className}`
      }
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick || undefined}
      tabIndex={tabIndex}
    >
      {buttonTitle && buttonTitle}
      {children && children}
    </button>
  );
};

export default Button;
