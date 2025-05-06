'use client';

import { useEffect, useState } from 'react';

export function useLCP() {
  const [isLCPCompleted, setIsLCPCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    const observer = new PerformanceObserver(entries => {
      for (const entry of entries.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          setIsLCPCompleted(true);
          observer.disconnect();
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });

    return () => observer.disconnect();
  }, []);

  return isLCPCompleted;
}
