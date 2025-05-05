'use client';

import { useState, useEffect } from 'react';
import { ContainerProps } from '@/ui/containers/Container/Container';

export default function ClientSubscribeForm() {
  const [Container, setContainer] = useState<React.ComponentType<ContainerProps> | null>(null);
  const [SubscribeForm, setSubscribeForm] = useState<React.ComponentType<unknown> | null>(null);

  useEffect(() => {
    import('@/ui/containers/Container/Container').then(module => {
      setContainer(() => module.default);
    });

    import('./SubscribeForm').then(module => {
      setSubscribeForm(() => module.default);
    });
  }, []);

  if (!Container || !SubscribeForm) return null;

  return (
    <Container>
      <SubscribeForm />
    </Container>
  );
}
