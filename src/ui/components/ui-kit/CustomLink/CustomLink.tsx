'use client';

import Link from 'next/link';
import React from 'react';

import { useLocale } from '@/hooks/useLocale';
import { slugSelector } from '@/utils/slugSelector';

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
  prefetch?: boolean | null;
}

const CustomLink = ({
  to,
  label = '',
  ariaLabel = '',
  children,
  className,
  type = 'link',
  onCLick,
  onHover,
  prefetch = false,
}: CustomLinkProps) => {
  const locale = useLocale();
  const href = slugSelector(locale, to);
  console.log('prefetch for link', href, prefetch);

  return (
    <div
      onClick={onCLick}
      onMouseEnter={onHover}
      className={`${styles['custom-link']} ${styles[`custom-link--${type}`]} ${className}`}
    >
      <Link aria-label={ariaLabel || label} href={href} prefetch={false}>
        {label && label}
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
