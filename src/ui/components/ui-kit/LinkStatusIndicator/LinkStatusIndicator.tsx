'use client';

import { useLinkStatus } from 'next/link';
import React from 'react';
import styles from './styles/link-status-indicator.module.scss';

const LinkStatusIndicator = () => {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <div className={styles['link-status-indicator']} aria-hidden="true">
      <div className={styles['link-status-indicator__spinner']}></div>
    </div>
  );
};

export default LinkStatusIndicator;
