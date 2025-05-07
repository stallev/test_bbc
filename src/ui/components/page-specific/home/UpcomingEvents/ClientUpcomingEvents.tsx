'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { ClientSectionProps } from '@/types/globalTypes';
import { Loader } from '@/ui/components/ui-kit';
import { UpcomingEventCardItemProps } from '../../upcoming-event/UpcomingEventCard/types';

const UpcomingEvents = dynamic(
  () => import('@/ui/components/page-specific/home/UpcomingEvents/UpcomingEvents'),
  { ssr: false, loading: () => <Loader /> }
);

export default function ClientUpcomingEvents({ locale, translations }: ClientSectionProps) {
  const [data, setData] = useState<UpcomingEventCardItemProps[] | null>(null);

  useEffect(() => {
    import('@/services/UpcomingDataApi')
      .then(module => module.default.getUpcomingEventsReduced(locale))
      .then(data => setData(data));
  }, [locale]);

  if (!data) return <Loader />;
  return <UpcomingEvents data={data} translations={translations} />;
}
