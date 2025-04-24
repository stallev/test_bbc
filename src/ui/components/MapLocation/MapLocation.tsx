"use client"

import React from 'react'
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';

import styles from "./styles/map-location.module.scss";

interface MapLocationProps {
  mapId: string
}

const center = {
  lat: 38.7052416, // default latitude
  lng: -121.2940813, // default longitude
};

const MapLocation = ({ mapId }: MapLocationProps) => {
  return (
    <Map
      defaultCenter={center}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={mapId}
      className={styles["map-location"]}
    >
      <AdvancedMarker
        position={center}
      />
    </Map>
  )
}

export default MapLocation
