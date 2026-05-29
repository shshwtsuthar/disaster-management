import {
  CATEGORY_MARKER_STYLES,
  type EonetCategoryId,
} from "@/lib/map/eonet";

const LEGEND_ITEMS: { id: EonetCategoryId; label: string }[] = [
  { id: "wildfires", label: "Wildfires" },
  { id: "severeStorms", label: "Severe storms" },
  { id: "floods", label: "Floods" },
  { id: "landslides", label: "Landslides" },
  { id: "earthquakes", label: "Earthquakes" },
];

type MapLegendProps = {
  showHistorical?: boolean;
  variant?: "light" | "dark";
};

export const MapLegend = ({
  showHistorical = false,
  variant = "light",
}: MapLegendProps) => {
  const textClass =
    variant === "dark" ? "text-slate-500" : "text-zinc-600 dark:text-zinc-400";

  return (
    <ul
      className={`mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs ${textClass}`}
      aria-label="Disaster event categories"
    >
      {showHistorical ? (
        <li className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full border border-dashed border-zinc-500 bg-zinc-400/40"
            aria-hidden
          />
          Historical (GDACS)
        </li>
      ) : null}
      {LEGEND_ITEMS.map(({ id, label }) => (
        <li key={id} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2"
            style={{
              backgroundColor: CATEGORY_MARKER_STYLES[id].fillColor,
              borderColor: CATEGORY_MARKER_STYLES[id].color,
            }}
            aria-hidden
          />
          {label}
        </li>
      ))}
    </ul>
  );
};
