'use client';

import { Map, AdvancedMarker, APIProvider } from '@vis.gl/react-google-maps';

import { GENERAL_GOOGLE_API_KEY } from '@/constants/APIs';

import styles from './styles/map-location.module.scss';

export interface MapLocationProps {
  mapId: string;
}

const center = {
  lat: 38.7052416, // default latitude
  lng: -121.2940813, // default longitude
};

const libraries = ['geometry', 'places'];

const MapLocation = ({ mapId }: MapLocationProps) => {
  return (
    <div>
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
    </div>
  );
};

export default MapLocation;
