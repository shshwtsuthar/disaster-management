"use client";

import type { Feature, Point } from "geojson";
import L from "leaflet";
import type { Layer } from "leaflet";
import { GeoJSON } from "react-leaflet";

import { buildGdacsPopupHtml } from "@/lib/map/gdacs-popup";
import {
  getGdacsMarkerStyle,
  type GdacsEventProperties,
  type GdacsFeatureCollection,
} from "@/lib/map/gdacs";

type GdacsEventsLayerProps = {
  events: GdacsFeatureCollection;
};

const POINT_RADIUS = 7;

export const GdacsEventsLayer = ({ events }: GdacsEventsLayerProps) => {
  if (events.features.length === 0) {
    return null;
  }

  const handleEachFeature = (
    feature: Feature<Point, GdacsEventProperties>,
    layer: Layer,
  ) => {
    layer.bindPopup(buildGdacsPopupHtml(feature), { maxWidth: 300 });
  };

  const handlePointToLayer = (
    feature: Feature<Point, GdacsEventProperties>,
    latlng: L.LatLng,
  ) => {
    const { fillColor, color } = getGdacsMarkerStyle(
      feature.properties?.eventtype ?? "",
    );

    return L.circleMarker(latlng, {
      radius: POINT_RADIUS,
      fillColor,
      color,
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.6,
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
