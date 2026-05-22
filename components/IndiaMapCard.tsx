"use client";

import dynamic from "next/dynamic";

import { MapLegend } from "@/components/MapLegend";
import {
  EMPTY_EONET_EVENTS,
  normalizeEonetEvents,
  type EonetFeatureCollection,
} from "@/lib/map/eonet";

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
  events?: EonetFeatureCollection | null;
};

export const IndiaMapCard = ({
  events: eventsProp,
}: IndiaMapCardProps) => {
  const events = normalizeEonetEvents(eventsProp ?? EMPTY_EONET_EVENTS);
  const eventCount = events.features.length;

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
        {eventCount > 0
          ? `${eventCount} open disaster event${eventCount === 1 ? "" : "s"} in the region (NASA EONET).`
          : "No open disaster events in the region right now. Data from NASA EONET."}
      </p>
      <div className="mt-4 h-80 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 [&_.leaflet-container]:rounded-xl">
        <IndiaMap events={events} />
      </div>
      <MapLegend />
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
        Click a marker for event details. Map panning is limited to India.
      </p>
    </section>
  );
};
