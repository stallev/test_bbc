'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '../ui-kit';

import styles from './styles/lazy-loader.module.scss';

export default function LazyLoader({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 200px 0px' } // Предзагрузка за 200px до попадания в viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles['lazy-loader']} ref={ref}>
      {isVisible ? (
        children
      ) : (
        <div style={{ height: '600px' }}>
          <Loader />
        </div>
      )}
    </div>
  );
}
