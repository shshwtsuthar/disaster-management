"use client";

import "leaflet/dist/leaflet.css";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { EonetEventsLayer } from "@/components/EonetEventsLayer";
import { GdacsEventsLayer } from "@/components/GdacsEventsLayer";
import { HistoricalGdacsEventsLayer } from "@/components/HistoricalGdacsEventsLayer";
import {
  INDIA_BOUNDS,
  INDIA_CENTER,
  INDIA_DEFAULT_ZOOM,
  INDIA_MAX_ZOOM,
  INDIA_MIN_ZOOM,
} from "@/lib/map/india-bounds";
import {
  EMPTY_EONET_EVENTS,
  normalizeEonetEvents,
  type EonetFeatureCollection,
} from "@/lib/map/eonet";
import {
  EMPTY_GDACS_EVENTS,
  normalizeGdacsEvents,
  type GdacsFeatureCollection,
} from "@/lib/map/gdacs";

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MapInvalidateOnResize = ({ signal }: { signal: boolean }) => {
  const map = useMap();

  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 0);
    return () => window.clearTimeout(id);
  }, [map, signal]);

  return null;
};

type IndiaMapProps = {
  eonetEvents?: EonetFeatureCollection | null;
  gdacsEvents?: GdacsFeatureCollection | null;
  historicalGdacsEvents?: GdacsFeatureCollection | null;
  resizeSignal?: boolean;
};

export const IndiaMap = ({
  eonetEvents: eonetProp,
  gdacsEvents: gdacsProp,
  historicalGdacsEvents: historicalGdacsProp,
  resizeSignal = false,
}: IndiaMapProps) => {
  const eonet = normalizeEonetEvents(eonetProp ?? EMPTY_EONET_EVENTS);
  const gdacs = normalizeGdacsEvents(gdacsProp ?? EMPTY_GDACS_EVENTS);
  const historicalGdacs = normalizeGdacsEvents(
    historicalGdacsProp ?? EMPTY_GDACS_EVENTS,
  );

  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={INDIA_DEFAULT_ZOOM}
      className="h-full w-full rounded-xl z-0"
      maxBounds={INDIA_BOUNDS}
      maxBoundsViscosity={1}
      minZoom={INDIA_MIN_ZOOM}
      maxZoom={INDIA_MAX_ZOOM}
      scrollWheelZoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={OSM_ATTRIBUTION}
      />
      <MapInvalidateOnResize signal={resizeSignal} />
      <HistoricalGdacsEventsLayer events={historicalGdacs} />
      <EonetEventsLayer events={eonet} />
      <GdacsEventsLayer events={gdacs} />
    </MapContainer>
  );
};
