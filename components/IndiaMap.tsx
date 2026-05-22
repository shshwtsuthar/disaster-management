"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

import { EonetEventsLayer } from "@/components/EonetEventsLayer";
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

const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

type IndiaMapProps = {
  events?: EonetFeatureCollection | null;
};

export const IndiaMap = ({ events: eventsProp }: IndiaMapProps) => {
  const events = normalizeEonetEvents(eventsProp ?? EMPTY_EONET_EVENTS);
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
      <EonetEventsLayer events={events} />
    </MapContainer>
  );
};
