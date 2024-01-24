import React from 'react';
import cx from 'classnames';
import { ComponentsMap } from './getIcons';

import styles from './styles/_icon.module.scss';

interface IconProps {
  iconName?: string,
  className?: string,
  onClick?: () => void,
  size?: string
  ariaLabel?: string,
}

const Icon:React.FC<IconProps> = ({
  iconName = '',
  className = '',
  onClick,
  size,
  ariaLabel = '',
}) => {

  const IconComponent = ComponentsMap[iconName];

  return (
    <div
      className={cx(styles[`${iconName}`], className)}
      aria-label={ariaLabel}
      onClick={onClick && onClick}
      role={onClick ? 'button' : 'none'}
      tabIndex={onClick ? 1 : 0}
      style={{ width: size, height: size }}
    >
      <IconComponent />
    </div>
  );
};

export default Icon;
