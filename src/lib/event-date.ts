/**
 * Event dates are stored as ISO strings (usually the selected calendar day at
 * local midnight). They are rendered in the organisation's timezone so the
 * server and the browser always agree on the day.
 */
export const EVENT_TIME_ZONE = "Asia/Dhaka";

export type EventDateParts = {
  year: string;
  month: string;
  monthShort: string;
  day: string;
  weekday: string;
  /** e.g. "Thursday, November 26, 2026" */
  formatted: string;
  /** e.g. "20261126" — useful for calendar links and .ics files */
  stamp: string;
};

export function getEventDateParts(
  value?: string | Date | null
): EventDateParts | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(date);

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  const year = part("year");
  const month = part("month");
  const day = part("day");
  const weekday = part("weekday");

  if (!year || !month || !day) return null;

  const monthShort = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    month: "short",
  }).format(date);

  const monthNumber = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    month: "2-digit",
  }).format(date);

  const dayNumber = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    day: "2-digit",
  }).format(date);

  return {
    year,
    month,
    monthShort,
    day,
    weekday,
    formatted: `${weekday}, ${month} ${Number(day)}, ${year}`,
    stamp: `${year}${monthNumber}${dayNumber}`,
  };
}

export function addDaysToStamp(stamp: string, days: number) {
  const year = Number(stamp.slice(0, 4));
  const month = Number(stamp.slice(4, 6));
  const day = Number(stamp.slice(6, 8));

  if (!year || !month || !day) return stamp;

  const next = new Date(Date.UTC(year, month - 1, day + days));

  return [
    next.getUTCFullYear(),
    String(next.getUTCMonth() + 1).padStart(2, "0"),
    String(next.getUTCDate()).padStart(2, "0"),
  ].join("");
}
