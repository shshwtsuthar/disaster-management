import { IndiaMapCard } from "@/components/IndiaMapCard";
import { fetchDashboardEvents } from "@/lib/dashboard/fetch-events";
import type { EonetFeatureCollection } from "@/lib/map/eonet";
import type { GdacsFeatureCollection } from "@/lib/map/gdacs";

type IndiaMapSectionProps = {
  eonetEvents?: EonetFeatureCollection;
  gdacsEvents?: GdacsFeatureCollection;
  historicalGdacsEvents?: GdacsFeatureCollection;
  layout?: "standalone" | "embedded";
};

export const IndiaMapSection = async ({
  eonetEvents: eonetProp,
  gdacsEvents: gdacsProp,
  historicalGdacsEvents: historicalProp,
  layout = "standalone",
}: IndiaMapSectionProps = {}) => {
  const events =
    eonetProp && gdacsProp && historicalProp
      ? {
          eonetEvents: eonetProp,
          gdacsEvents: gdacsProp,
          historicalGdacsEvents: historicalProp,
        }
      : await fetchDashboardEvents();

  return (
    <IndiaMapCard
      eonetEvents={events.eonetEvents}
      gdacsEvents={events.gdacsEvents}
      historicalGdacsEvents={events.historicalGdacsEvents}
      layout={layout}
    />
  );
};
