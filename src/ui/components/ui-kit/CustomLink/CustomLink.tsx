import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import styles from './styles/custom-link.module.scss';

interface CustomLinkProps {
  to: string,
  label?: string,
  children?: React.ReactNode,
  className?: string,
  type?: string,
  ariaLabel?: string,
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  label = '',
  ariaLabel = '',
  children,
  className,
  type = 'link'
}: CustomLinkProps) => {
  return (
    <div className={cx(
      styles['custom-link'],
      styles[`custom-link--${type}`],
      className,
      )}>
      <Link
        aria-label={ariaLabel || label}
        href={to}
      >
        {label && label}
        {children}
      </Link>
    </div>
  )
};

export default CustomLink;
