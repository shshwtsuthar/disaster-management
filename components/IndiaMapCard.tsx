"use client";

import dynamic from "next/dynamic";

import { MapLegend } from "@/components/MapLegend";
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

const IndiaMap = dynamic(
  () => import("@/components/IndiaMap").then((mod) => mod.IndiaMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900"
        aria-hidden
      />
    ),
  },
);

type IndiaMapCardProps = {
  eonetEvents?: EonetFeatureCollection | null;
  gdacsEvents?: GdacsFeatureCollection | null;
  historicalGdacsEvents?: GdacsFeatureCollection | null;
};

export const IndiaMapCard = ({
  eonetEvents: eonetProp,
  gdacsEvents: gdacsProp,
  historicalGdacsEvents: historicalGdacsProp,
}: IndiaMapCardProps) => {
  const eonet = normalizeEonetEvents(eonetProp ?? EMPTY_EONET_EVENTS);
  const gdacs = normalizeGdacsEvents(gdacsProp ?? EMPTY_GDACS_EVENTS);
  const historicalGdacs = normalizeGdacsEvents(
    historicalGdacsProp ?? EMPTY_GDACS_EVENTS,
  );
  const liveCount = eonet.features.length + gdacs.features.length;
  const historicalCount = historicalGdacs.features.length;

  return (
    <section
      className="mx-auto mt-6 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
      aria-labelledby="india-map-heading"
    >
      <h2
        id="india-map-heading"
        className="text-xs font-medium uppercase tracking-wide text-zinc-500"
      >
        Operations map
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {liveCount > 0
          ? `${liveCount} open disaster event${liveCount === 1 ? "" : "s"} in the region (NASA EONET + GDACS).`
          : "No open disaster events in the region right now. Data from NASA EONET & GDACS."}
        {historicalCount > 0
          ? ` ${historicalCount} historical GDACS event${historicalCount === 1 ? "" : "s"} (2000–present).`
          : ""}
      </p>
      <div className="relative mt-4 h-80 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 [&_.leaflet-container]:rounded-xl">
        <IndiaMap
          eonetEvents={eonet}
          gdacsEvents={gdacs}
          historicalGdacsEvents={historicalGdacs}
        />
      </div>
      <MapLegend showHistorical={historicalCount > 0} />
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
        Solid markers: live events. Dashed markers: historical GDACS (click to
        load affected area). Map panning is limited to India.
      </p>
    </section>
  );
};
