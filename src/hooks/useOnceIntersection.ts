import { useState, useEffect, RefObject } from 'react';

export const useOnceIntersection = (
  elementRef: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [isIntersected, setIsIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isIntersected) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef, isIntersected, options]);

  return isIntersected;
};
