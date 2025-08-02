'use client';

import { useLinkStatus } from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function LinkStatusIndicator() {
  const [showLoader, setShowLoader] = useState(false);
  const { pending } = useLinkStatus();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (pending) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 200);
    } else {
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [pending, showLoader]);

  return pending ? <Loader isFullScreen={true} /> : null;
}
