"use client";

import { useMemo, useState } from "react";

import { TextLink } from "@/components/foundation/TextLink";
import { formatDisplayDate, formatPersianDate } from "@/lib/content/dates";
import type { ScheduleEntry, ScheduleEntryType } from "@/types/content";

import styles from "./ScheduleCards.module.css";

type ScheduleCardsProps = { entries: ScheduleEntry[] };
type CalendarDate = { iso: string; day: number; inMonth: boolean };

const typeLabels: Record<ScheduleEntryType, string> = {
  lecture: "Lecture",
  workshop: "Workshop",
  release: "Release",
  deadline: "Deadline",
  holiday: "Holiday",
  exam: "Exam",
  lab: "Lab",
  other: "Presentation",
};

const weekdays = [
  { short: "Sun", full: "Sunday" },
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
];

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseIso(iso: string): [number, number, number] {
  return iso.split("-").map(Number) as [number, number, number];
}

function monthStart(iso: string): Date {
  const [year, month] = parseIso(iso);
  return new Date(Date.UTC(year, month - 1, 1));
}

function shiftMonth(date: Date, amount: number): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function currentIsoDate(): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date()).map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function dateWeekday(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "Asia/Tehran",
  }).format(new Date(`${iso}T12:00:00`));
}

function entryHref(entry: ScheduleEntry): { href: string; label: string } | undefined {
  if (entry.type === "workshop") return { href: `/workshops#${entry.slug}`, label: "Workshop" };
  if (entry.type === "lecture" && entry.lectureIds?.[0]) {
    return { href: `/lectures#${entry.lectureIds[0]}`, label: "Lecture" };
  }
  if ((entry.type === "release" || entry.type === "deadline") && entry.assignmentIds?.[0]) {
    return { href: `/assignments#${entry.assignmentIds[0]}`, label: "Assignment" };
  }
  return undefined;
}

function staffHref(instructor: string | undefined): string | undefined {
  if (!instructor) return undefined;
  const slug = instructor.toLowerCase().replace(/^dr\.?\s+/, "").replace(/[^a-z0-9]+/g, "-");
  if (slug.includes("khalaj")) return "/staff#babak-hossein-khalaj";
  if (slug.includes("saberi")) return "/staff#amir-hossein-saberi";
  if (slug.includes("eshtehardian")) return "/staff#mohammad-eshtehardian";
  return "/staff";
}

function EntryList({ entries }: { entries: ScheduleEntry[] }) {
  if (entries.length === 0) {
    return <p className={styles.emptyDay}>No scheduled items on this day.</p>;
  }

  return (
    <ul className={styles.entryList}>
      {entries.map((entry) => {
        const href = entryHref(entry);
        const instructorHref = staffHref(entry.instructor);
        return (
          <li className={styles.entry} key={entry.id}>
            <span className={`${styles.entryMarker} ${styles[`marker${entry.type}`]}`} aria-hidden="true" />
            <div className={styles.entryContent}>
              <div className={styles.entryHeader}>
                <span className={`${styles.entryType} ${styles[`type${entry.type}`]}`}>
                  {typeLabels[entry.type]}
                </span>
                <h3 className={styles.entryTitle}>{entry.title}</h3>
              </div>
              {entry.description ? <p className={styles.description}>{entry.description}</p> : null}
              <div className={styles.entryMeta}>
                {entry.instructor ? (
                  instructorHref ? <TextLink href={instructorHref}>{entry.instructor}</TextLink> : <span>{entry.instructor}</span>
                ) : null}
                {href ? <TextLink href={href.href}>{href.label}</TextLink> : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ScheduleCards({ entries }: ScheduleCardsProps) {
  const firstDate = entries[0]?.date ?? currentIsoDate();
  const [selectedDate, setSelectedDate] = useState(firstDate);
  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(firstDate));
  const entriesByDate = useMemo(() => {
    const grouped = new Map<string, ScheduleEntry[]>();
    entries.forEach((entry) => grouped.set(entry.date, [...(grouped.get(entry.date) ?? []), entry]));
    return grouped;
  }, [entries]);
  const today = currentIsoDate();
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(visibleMonth);
  const monthDays = new Date(Date.UTC(visibleMonth.getUTCFullYear(), visibleMonth.getUTCMonth() + 1, 0)).getUTCDate();
  const leadingDays = visibleMonth.getUTCDay();
  const days: CalendarDate[] = Array.from({ length: 42 }, (_, index) => {
    const dayOffset = index - leadingDays;
    const date = new Date(Date.UTC(visibleMonth.getUTCFullYear(), visibleMonth.getUTCMonth(), dayOffset + 1));
    return {
      iso: isoDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      day: date.getUTCDate(),
      inMonth: index >= leadingDays && index < leadingDays + monthDays,
    };
  });
  const selectedEntries = entriesByDate.get(selectedDate) ?? [];

  function chooseDate(date: CalendarDate) {
    setSelectedDate(date.iso);
    if (date.iso.slice(0, 7) !== selectedDate.slice(0, 7)) setVisibleMonth(monthStart(date.iso));
  }

  function goToMonth(amount: number) {
    const next = shiftMonth(visibleMonth, amount);
    setVisibleMonth(next);
  }

  function goToToday() {
    setSelectedDate(today);
    setVisibleMonth(monthStart(today));
  }

  return (
    <section className={styles.calendar} aria-label="Course schedule calendar">
      <div className={styles.calendarHeader}>
        <div>
          <p className={styles.eyebrow}>Semester overview</p>
          <h2 className={styles.calendarTitle} id="schedule-calendar-title">{monthLabel}</h2>
        </div>
        <div className={styles.controls} aria-label="Calendar navigation">
          <button className={styles.todayButton} type="button" onClick={goToToday}>Today</button>
          <button className={styles.navButton} type="button" onClick={() => goToMonth(-1)} aria-label="Previous month">←</button>
          <button className={styles.navButton} type="button" onClick={() => goToMonth(1)} aria-label="Next month">→</button>
        </div>
      </div>

      <div className={styles.calendarLayout}>
        <div className={styles.monthPanel}>
          <div className={styles.weekdays} role="row">
            {weekdays.map((weekday) => <span key={weekday.full} role="columnheader"><abbr title={weekday.full}>{weekday.short}</abbr></span>)}
          </div>
          <div className={styles.monthGrid} role="grid" aria-labelledby="schedule-calendar-title" aria-live="polite">
            {days.map((date) => {
              const dayEntries = entriesByDate.get(date.iso) ?? [];
              const isSelected = selectedDate === date.iso;
              const isToday = today === date.iso;
              const types = Array.from(new Set(dayEntries.map((entry) => entry.type)));
              return (
                <button
                  className={`${styles.dayCell} ${!date.inMonth ? styles.outsideMonth : ""} ${isSelected ? styles.selectedDay : ""} ${isToday ? styles.today : ""}`}
                  key={date.iso}
                  type="button"
                  role="gridcell"
                  aria-current={isToday ? "date" : undefined}
                  aria-selected={isSelected}
                  aria-label={`${dateWeekday(date.iso)}, ${formatDisplayDate(date.iso)}${dayEntries.length ? `, ${dayEntries.length} scheduled ${dayEntries.length === 1 ? "item" : "items"}` : ""}`}
                  onClick={() => chooseDate(date)}
                >
                  <span className={styles.dayNumber}>{date.day}</span>
                  {dayEntries.length > 0 ? (
                    <span className={styles.eventSummary}>
                      <span className={styles.eventCount}>{dayEntries.length}</span>
                      <span className={styles.eventDots} aria-hidden="true">
                        {types.slice(0, 3).map((type) => <span className={`${styles.eventDot} ${styles[`dot${type}`]}`} key={type} />)}
                      </span>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <aside className={styles.agenda} aria-labelledby="selected-day-title">
          <div className={styles.agendaHeader}>
            <div>
              <p className={styles.eyebrow}>Selected day</p>
              <h2 id="selected-day-title">{dateWeekday(selectedDate)}</h2>
              <p className={styles.agendaDate}>{formatDisplayDate(selectedDate)} · {formatPersianDate(selectedDate)}</p>
            </div>
            <span className={styles.agendaCount}>{selectedEntries.length} {selectedEntries.length === 1 ? "item" : "items"}</span>
          </div>
          <EntryList entries={selectedEntries} />
        </aside>
      </div>
    </section>
  );
}
