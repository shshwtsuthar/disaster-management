"use client";

import type { Feature, Point } from "geojson";
import L from "leaflet";
import type { Layer } from "leaflet";
import { GeoJSON } from "react-leaflet";

import { buildEonetPopupHtml } from "@/lib/map/eonet-popup";
import {
  getCategoryId,
  getMarkerStyleForCategory,
  type EonetEventProperties,
  type EonetFeatureCollection,
} from "@/lib/map/eonet";

type EonetEventsLayerProps = {
  events: EonetFeatureCollection;
};

const POINT_RADIUS = 7;

export const EonetEventsLayer = ({ events }: EonetEventsLayerProps) => {
  if (events.features.length === 0) {
    return null;
  }

  const handleEachFeature = (
    feature: Feature<Point, EonetEventProperties>,
    layer: Layer,
  ) => {
    layer.bindPopup(buildEonetPopupHtml(feature), { maxWidth: 280 });
  };

  const handlePointToLayer = (
    feature: Feature<Point, EonetEventProperties>,
    latlng: L.LatLng,
  ) => {
    const categoryId = getCategoryId(feature.properties);
    const { fillColor, color } = getMarkerStyleForCategory(categoryId);

    return L.circleMarker(latlng, {
      radius: POINT_RADIUS,
      fillColor,
      color,
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.85,
    });
  };

  return (
    <GeoJSON
      data={events}
      pointToLayer={handlePointToLayer}
      onEachFeature={handleEachFeature}
    />
  );
};
