'use client';

import { useEffect, useState } from 'react';

declare global {
  interface LargestContentfulPaint extends PerformanceEntry {
    readonly element: Element | null;
    readonly renderTime: DOMHighResTimeStamp;
    readonly loadTime: DOMHighResTimeStamp;
    readonly size: number;
    readonly id: string;
    readonly url: string;
  }
}

export const useLazyHydration = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    let perfObserver: PerformanceObserver | null = null;

    const handleLCP = (entryList: PerformanceObserverEntryList) => {
      const entries = entryList.getEntries();
      const lcpEntry = entries[entries.length - 1] as LargestContentfulPaint;

      if (lcpEntry) {
        setShouldLoad(true);
        perfObserver?.disconnect();
      }
    };

    // Try Performance Observer first
    if ('PerformanceObserver' in window) {
      perfObserver = new PerformanceObserver(handleLCP);
      perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      const timeout = setTimeout(() => {
        setShouldLoad(true);
        perfObserver?.disconnect();
      }, 6000);

      return () => {
        clearTimeout(timeout);
        perfObserver?.disconnect();
      };
    } else {
      // Fallback to Intersection Observer
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: '200px' }
      );

      const placeholder = document.querySelector('#lazy-root');
      if (placeholder) observer.observe(placeholder);

      return () => observer.disconnect();
    }
  }, []);

  return shouldLoad;
};
