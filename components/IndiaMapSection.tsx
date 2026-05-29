import { IndiaMapCard } from "@/components/IndiaMapCard";
import { fetchEonetEvents, normalizeEonetEvents } from "@/lib/map/eonet";
import {
  fetchGdacsEvents,
  filterIndiaEvents,
  normalizeGdacsEvents,
} from "@/lib/map/gdacs";
import { loadHistoricalGdacsEvents } from "@/lib/map/load-historical-gdacs";

export const IndiaMapSection = async () => {
  const [eonetRaw, gdacsRaw, historicalGdacsEvents] = await Promise.all([
    fetchEonetEvents(),
    fetchGdacsEvents(),
    loadHistoricalGdacsEvents(),
  ]);

  const eonetEvents = normalizeEonetEvents(eonetRaw);
  const gdacsEvents = filterIndiaEvents(normalizeGdacsEvents(gdacsRaw));

  return (
    <IndiaMapCard
      eonetEvents={eonetEvents}
      gdacsEvents={gdacsEvents}
      historicalGdacsEvents={historicalGdacsEvents}
    />
  );
};
