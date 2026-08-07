/**
 * Display dates as `D Mon YYYY` sitewide (design-spec/07-content.md).
 * Course timezone baseline: Asia/Tehran.
 */
const COURSE_TIME_ZONE = "Asia/Tehran";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function partsInTehran(iso: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: COURSE_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });

  const bag = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour: Number(bag.hour),
    minute: Number(bag.minute),
  };
}

/** Compact list date: `7 Aug 2026` */
export function formatDisplayDate(iso: string): string {
  const parts = partsInTehran(iso.includes("T") ? iso : `${iso}T12:00:00`);
  if (!parts) {
    return iso;
  }

  return `${parts.day} ${MONTHS[parts.month - 1]} ${parts.year}`;
}

/** Deadline with optional time: `7 Aug 2026, 23:59` (Asia/Tehran) */
export function formatDeadline(iso: string): string {
  const parts = partsInTehran(iso);
  if (!parts) {
    return iso;
  }

  const hasTime = iso.includes("T");
  const datePart = `${parts.day} ${MONTHS[parts.month - 1]} ${parts.year}`;
  if (!hasTime) {
    return datePart;
  }

  const hh = String(parts.hour).padStart(2, "0");
  const mm = String(parts.minute).padStart(2, "0");
  return `${datePart}, ${hh}:${mm}`;
}

export function getCourseTimeZone(): string {
  return COURSE_TIME_ZONE;
}

/** Persian (Jalali) calendar label via Intl, e.g. for Mehr–Dey schedule display. */
export function formatPersianDate(iso: string): string {
  const date = new Date(iso.includes("T") ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  try {
    return new Intl.DateTimeFormat("en-US-u-ca-persian", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: COURSE_TIME_ZONE,
    }).format(date);
  } catch {
    return formatDisplayDate(iso);
  }
}
