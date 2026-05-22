"use client";

import dynamic from "next/dynamic";

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

export const IndiaMapCard = () => {
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
        Pan and zoom within India.
      </p>
      <div className="mt-4 h-80 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 [&_.leaflet-container]:rounded-xl">
        <IndiaMap />
      </div>
    </section>
  );
};
