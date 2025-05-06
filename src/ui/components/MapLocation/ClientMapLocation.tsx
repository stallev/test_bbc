'use client';

import dynamic from 'next/dynamic';
import { MapLocationProps } from '@/ui/components/MapLocation/MapLocation';
import { Loader } from '../ui-kit';

const MapLocation = dynamic(() => import('@/ui/components/MapLocation/MapLocation'), {
  ssr: false,
  loading: () => <Loader />,
});

const ClientMaplocation = ({ mapId }: MapLocationProps) => {
  return <MapLocation mapId={mapId} />;
};

export default ClientMaplocation;
