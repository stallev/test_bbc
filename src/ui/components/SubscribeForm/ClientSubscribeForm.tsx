'use client';

import dynamic from 'next/dynamic';

const SubscribeForm = dynamic(() => import('./SubscribeForm'), {
  ssr: false,
});

export default function ClientSubscribeForm() {
  return <SubscribeForm />;
}
