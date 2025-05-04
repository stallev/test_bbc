'use client';

import dynamic from 'next/dynamic';
import { Loader } from '@/ui/components/ui-kit';
import { StaffSectionProps } from './types';

const Staff = dynamic(() => import('@/ui/components/page-specific/home/Staff/Staff'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function ClientStaff(props: StaffSectionProps) {
  return <Staff {...props} />;
}
