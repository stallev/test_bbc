'use client';

import { useLinkStatus } from 'next/link';
import { useEffect, useState } from 'react';

import styles from './styles/link-status-indicator.module.scss';

export default function LinkStatusIndicator() {
  const [showLoader, setShowLoader] = useState(false);
  const { pending } = useLinkStatus();

  useEffect(() => {
    if (pending) {
      setShowLoader(true);
      console.log('showLoader value', showLoader);
      console.log('current timestamp', new Date().toISOString());
    } else {
      setShowLoader(false);
      console.log('showLoader value', showLoader);
      console.log('current timestamp', new Date().toISOString());
    }
  }, [pending, showLoader]);

  return pending ? <div role="status" aria-label="Loading" className={styles['spinner']} /> : null;
}
