'use client';

import dynamic from 'next/dynamic';
import { NotificationProps } from './Notification';

const Notification = dynamic(() => import('./Notification'), {
  ssr: false,
});

export default function ClientNotification(props: NotificationProps) {
  return <Notification {...props} />;
}
