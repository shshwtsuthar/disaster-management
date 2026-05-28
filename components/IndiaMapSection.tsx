import { IndiaMapCard } from "@/components/IndiaMapCard";
import { fetchEonetEvents, normalizeEonetEvents } from "@/lib/map/eonet";
import {
  fetchGdacsEvents,
  filterIndiaEvents,
  normalizeGdacsEvents,
} from "@/lib/map/gdacs";

export const IndiaMapSection = async () => {
  const [eonetRaw, gdacsRaw] = await Promise.all([
    fetchEonetEvents(),
    fetchGdacsEvents(),
  ]);

  const eonetEvents = normalizeEonetEvents(eonetRaw);
  const gdacsEvents = filterIndiaEvents(normalizeGdacsEvents(gdacsRaw));

  return <IndiaMapCard eonetEvents={eonetEvents} gdacsEvents={gdacsEvents} />;
};
