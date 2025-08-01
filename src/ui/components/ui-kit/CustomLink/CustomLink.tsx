'use client';

import Link from 'next/link';
import React from 'react';

import { useLocale } from '@/hooks/useLocale';
import { slugSelector } from '@/utils/slugSelector';
// import LinkStatusIndicator from '../LinkStatusIndicator/LinkStatusIndicator';

import styles from './styles/custom-link.module.scss';

interface CustomLinkProps {
  to: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  type?: string;
  ariaLabel?: string;
  onCLick?: () => void;
  onHover?: () => void;
  forcePrefetch?: boolean;
  prefetch?: boolean | null;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  label = '',
  ariaLabel = '',
  children,
  className,
  type = 'link',
  onCLick,
  onHover,
  prefetch = true,
}: CustomLinkProps) => {
  const locale = useLocale();
  const href = slugSelector(locale, to);

  return (
    <div
      onClick={onCLick}
      onMouseEnter={onHover}
      className={`${styles['custom-link']} ${styles[`custom-link--${type}`]} ${className}`}
    >
      <Link aria-label={ariaLabel || label} href={href} prefetch={prefetch}>
        {label && label}
        {/* <LinkStatusIndicator /> */}
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
