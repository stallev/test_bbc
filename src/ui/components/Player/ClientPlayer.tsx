'use client';

import dynamic from 'next/dynamic';

const Player = dynamic(() => import('./Player'), {
  ssr: false,
});

export default function ClientPlayer() {
  return <Player />;
}
