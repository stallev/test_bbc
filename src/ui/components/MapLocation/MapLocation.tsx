"use client";

import React, { useRef } from "react";
import { useOnceIntersection } from "@/hooks/useOnceIntersection";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import styles from "./styles/map-location.module.scss";

interface MapLocationProps {
  mapId: string;
}

const center = {
  lat: 38.7052416, // default latitude
  lng: -121.2940813, // default longitude
};

const MapLocation = ({ mapId }: MapLocationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapVisible = useOnceIntersection(mapRef);
  return (
    <div ref={mapRef}>
      {isMapVisible && (
        <Map
          defaultCenter={center}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={mapId}
          className={styles["map-location"]}
        >
          <AdvancedMarker position={center} />
        </Map>
      )}
    </div>
  );
};

export default MapLocation;
