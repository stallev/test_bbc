'use client';

import Link from 'next/link';
import React from 'react';

import { useLocale } from '@/hooks/useLocale';
import { slugSelector } from '@/utils/slugSelector';

import Icon from '../Icon';
import styles from './styles/read-more-link.module.scss';

interface ReadMoreLinkProps {
  to: string;
  label: string;
  className?: string;
}

const ReadMoreLink: React.FC<ReadMoreLinkProps> = ({ to, label, className }) => {
  const locale = useLocale();
  const href = slugSelector(locale, to);

  return (
    <Link
      prefetch={true}
      className={`${styles['read-more-link']} ${className ? className : ''}`}
      href={href}
    >
      <Icon className={styles['read-more-link__icon']} iconName="rightArrow" />

      <span>{label}</span>
    </Link>
  );
};

export default ReadMoreLink;
