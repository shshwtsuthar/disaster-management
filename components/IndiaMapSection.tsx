import { IndiaMapCard } from "@/components/IndiaMapCard";
import { fetchEonetEvents, normalizeEonetEvents } from "@/lib/map/eonet";

export const IndiaMapSection = async () => {
  const events = normalizeEonetEvents(await fetchEonetEvents());

  return <IndiaMapCard events={events} />;
};
