'use client';

import dynamic from 'next/dynamic';
import { MinistriesProps } from '@/ui/components/page-specific/home/Ministries/Ministries';
import { Loader } from '@/ui/components/ui-kit';

const Ministries = dynamic(
  () => import('@/ui/components/page-specific/home/Ministries/Ministries'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const ClientMinistries = ({ translations }: MinistriesProps) => {
  return <Ministries translations={translations} />;
};

export default ClientMinistries;
