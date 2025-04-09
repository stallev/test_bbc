'use client';

import { Map, AdvancedMarker, APIProvider } from '@vis.gl/react-google-maps';
import React, { useRef } from 'react';

import { GENERAL_GOOGLE_API_KEY } from '@/constants/APIs';
import { useOnceIntersection } from '@/hooks/useOnceIntersection';

import styles from './styles/map-location.module.scss';

interface MapLocationProps {
  mapId: string;
}

const center = {
  lat: 38.7052416, // default latitude
  lng: -121.2940813, // default longitude
};

const libraries = ['geometry', 'places'];

const MapLocation = ({ mapId }: MapLocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapVisible = useOnceIntersection(mapRef);

  return (
    <div ref={mapRef}>
      {isMapVisible && (
        <APIProvider apiKey={GENERAL_GOOGLE_API_KEY} libraries={libraries}>
          <Map
            defaultCenter={center}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={mapId}
            className={styles['map-location']}
          >
            <AdvancedMarker position={center} />
          </Map>
        </APIProvider>
      )}
    </div>
  );
};

export default MapLocation;
