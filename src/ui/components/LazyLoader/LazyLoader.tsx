'use client';

import { useLCP } from '@/hooks/useLCP';
import { Loader } from '@/ui/components/ui-kit';

export default function LazyLoader({ children }: { children: React.ReactNode }) {
  const isLCPCompleted = useLCP();

  if (!isLCPCompleted) return <Loader />;

  return <>{children}</>;
}
