'use client';

import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  APIProvider,
  Map,
  Pin,
  RenderingType,
} from '@vis.gl/react-google-maps';
import { useRef } from 'react';
import { useOnceIntersection } from '@/hooks/useOnceIntersection';
import styles from './styles/map-location.module.scss';

const MapLocation = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapVisible = useOnceIntersection(mapRef);
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY || '';
  const markerPosition = {
    lat: 38.7051,
    lng: -121.29131,
  };

  return (
    <div ref={mapRef}>
      {isMapVisible && (
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={markerPosition}
            defaultZoom={12}
            disableDefaultUI={true}
            mapId={'21291ed2b8ff8b0df6ebc38c'}
            renderingType={RenderingType.VECTOR}
            className={styles['map-location']}
          >
            <AdvancedMarker position={markerPosition} title={'Bible Baptist Church'}>
              <Pin background={'#ff3838'} glyphColor={'#bb0000'} borderColor={'#da0000'} />
            </AdvancedMarker>
            <AdvancedMarker
              position={markerPosition}
              anchorPoint={AdvancedMarkerAnchorPoint.LEFT_BOTTOM}
              className={styles['maker-name']}
            >
              <span>Bible Baptist Church</span>
            </AdvancedMarker>
          </Map>
        </APIProvider>
      )}
    </div>
  );
};

export default MapLocation;
