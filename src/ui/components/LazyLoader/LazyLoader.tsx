'use client';

import { Suspense } from 'react';
import { useLazyHydration } from '@/hooks/useLazyHydration';
import { Loader } from '../ui-kit';

const LazyLoader = ({ children }: { children: React.ReactNode }) => {
  const shouldLoad = useLazyHydration();

  if (!shouldLoad) return <div id="lazy-root" />;

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default LazyLoader;
