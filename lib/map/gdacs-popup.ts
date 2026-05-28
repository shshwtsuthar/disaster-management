import type { Feature, Point } from "geojson";

import { formatGdacsType, type GdacsEventProperties } from "@/lib/map/gdacs";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

export const buildGdacsPopupHtml = (
  feature: Feature<Point, GdacsEventProperties>,
): string => {
  const props = feature.properties;
  if (!props) {
    return "<p>Event details unavailable</p>";
  }

  const disasterType = formatGdacsType(props.eventtype);
  const alertLevel = props.alertlevel ?? "—";
  const severity = props.severitydata?.severitytext ?? "—";
  const coords = feature.geometry?.coordinates;
  const lat = coords?.[1]?.toFixed(2) ?? "—";
  const lng = coords?.[0]?.toFixed(2) ?? "—";
  const country = props.country ?? "—";
  const description = props.description
    ? escapeHtml(props.description)
    : "No description available.";
  const title = escapeHtml(props.name ?? props.eventname ?? "Unknown event");

  const gdacsLink = props.url?.report
    ? `<a href="${escapeHtml(props.url.report)}" target="_blank" rel="noopener noreferrer">GDACS event page</a>`
    : "";

  const alertColor =
    alertLevel === "Red"
      ? "text-red-600"
      : alertLevel === "Orange"
        ? "text-orange-500"
        : "text-green-600";

  return `
    <div class="min-w-[10rem] max-w-[14rem] text-sm leading-snug text-zinc-900">
      <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">${escapeHtml(disasterType)}</p>
      <p class="mt-1 font-semibold">${title}</p>
      <p class="mt-1 text-xs"><strong>Alert:</strong> <span class="${alertColor} font-medium">${escapeHtml(alertLevel)}</span></p>
      <p class="text-xs"><strong>Severity:</strong> ${escapeHtml(severity)}</p>
      <p class="text-xs"><strong>Location:</strong> ${lat}, ${lng}</p>
      <p class="text-xs"><strong>Country:</strong> ${escapeHtml(country)}</p>
      <p class="mt-1 text-xs text-zinc-600">${description}</p>
      <p class="mt-1 text-xs"><strong>From:</strong> ${props.fromdate ? formatDate(props.fromdate) : "—"}</p>
      ${props.todate ? `<p class="text-xs"><strong>To:</strong> ${formatDate(props.todate)}</p>` : ""}
      ${gdacsLink ? `<p class="mt-2 text-xs">${gdacsLink}</p>` : ""}
    </div>
  `;
};
