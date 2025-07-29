'use client';

import { useLinkStatus } from 'next/link';
import { useEffect, useState } from 'react';
import styles from './styles/link-status-indicator.module.scss';

const LinkStatusIndicator = () => {
  const { pending } = useLinkStatus();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (pending) {
      timer = setTimeout(() => setShowLoader(true), 100);
    } else {
      setShowLoader(false);
    }
    return () => clearTimeout(timer);
  }, [pending]);

  if (!showLoader) return null;

  return (
    <div className={styles['link-status-indicator']} aria-hidden="true">
      <div className={styles['link-status-indicator__spinner']}></div>
    </div>
  );
};

export default LinkStatusIndicator;
