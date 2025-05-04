'use client';

import dynamic from 'next/dynamic';
import { Loader } from '@/ui/components/ui-kit';
import { UpcomingEventListProps } from './types';

const UpcomingEvents = dynamic(
  () => import('@/ui/components/page-specific/home/UpcomingEvents/UpcomingEvents'),
  { ssr: false, loading: () => <Loader /> }
);

export default function ClientUpcomingEvents(props: UpcomingEventListProps) {
  return <UpcomingEvents {...props} />;
}
