'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import { Locale } from '@/i18n.config';
import { ClientSectionProps } from '@/types/globalTypes';
import { Loader } from '@/ui/components/ui-kit';
import { StaffPersonCardDataProps } from '../../staff/StaffPersonCard/types';

const Staff = dynamic(() => import('@/ui/components/page-specific/home/Staff/Staff'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function ClientStaff({ locale, translations }: ClientSectionProps) {
  const [data, setData] = useState<StaffPersonCardDataProps[] | null>(null);

  const getStaffData = async (locale: Locale) =>
    import('@/services/StaffDataApi').then(module => module.default.getMinisters(locale));

  useEffect(() => {
    getStaffData(locale).then(setData);
  }, [locale]);

  if (!data) return <Loader />;
  return <Staff data={data} translations={translations} />;
}
