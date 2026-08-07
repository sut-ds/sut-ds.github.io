import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import { formatDisplayDate, formatPersianDate } from "@/lib/content/dates";
import type { ScheduleEntry, ScheduleEntryType } from "@/types/content";

import styles from "./ScheduleTable.module.css";

type ScheduleTableProps = {
  entries: ScheduleEntry[];
};

function kindLabel(type: ScheduleEntryType): string {
  switch (type) {
    case "lecture":
      return "Lecture";
    case "workshop":
      return "Workshop";
    case "release":
      return "Release";
    case "deadline":
      return "Deadline";
    default:
      return type;
  }
}

function kindClass(type: ScheduleEntryType): string | undefined {
  switch (type) {
    case "lecture":
      return styles.kindLecture;
    case "workshop":
      return styles.kindWorkshop;
    case "release":
      return styles.kindRelease;
    case "deadline":
      return styles.kindDeadline;
    default:
      return undefined;
  }
}

function dateToneClass(type: ScheduleEntryType): string | undefined {
  switch (type) {
    case "lecture":
      return styles.dateLecture;
    case "workshop":
      return styles.dateWorkshop;
    case "release":
      return styles.dateRelease;
    case "deadline":
      return styles.dateDeadline;
    default:
      return undefined;
  }
}

function rowClass(type: ScheduleEntryType): string | undefined {
  if (type === "release") return styles.rowRelease;
  if (type === "deadline") return styles.rowDeadline;
  return undefined;
}

function staffHref(instructor: string | undefined): string | undefined {
  if (!instructor) return undefined;
  const slug = instructor
    .toLowerCase()
    .replace(/^dr\.?\s+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (slug.includes("khalaj")) return "/staff#babak-hossein-khalaj";
  if (slug.includes("saberi")) return "/staff#amir-hossein-saberi";
  if (slug.includes("eshtehardian")) return "/staff#mohammad-eshtehardian";
  return "/staff";
}

export function ScheduleTable({ entries }: ScheduleTableProps) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Course schedule — lectures, workshops, and coursework dates
        </caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Session / item</th>
            <th scope="col">Instructor</th>
            <th scope="col">Links</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const instructorHref = staffHref(entry.instructor);
            const lectureSlug = entry.lectureIds?.[0];
            const assignmentSlug = entry.assignmentIds?.[0];

            return (
              <tr key={entry.id} className={rowClass(entry.type)}>
                <td className={cx(styles.dateCell, dateToneClass(entry.type))}>
                  <span className={styles.dateFa}>{formatPersianDate(entry.date)}</span>
                  <span className={styles.dateEn}>{formatDisplayDate(entry.date)}</span>
                </td>
                <td>
                  <span className={cx(styles.kind, kindClass(entry.type))}>
                    {kindLabel(entry.type)}
                  </span>
                </td>
                <td>
                  <div className={styles.title}>{entry.title}</div>
                  {entry.week != null ? (
                    <div className={styles.meta}>Week {entry.week}</div>
                  ) : null}
                </td>
                <td>
                  {entry.instructor ? (
                    instructorHref ? (
                      <TextLink href={instructorHref}>{entry.instructor}</TextLink>
                    ) : (
                      entry.instructor
                    )
                  ) : (
                    <span className={styles.muted}>—</span>
                  )}
                </td>
                <td>
                  <ul className={styles.links}>
                    {entry.type === "workshop" ? (
                      <li>
                        <TextLink href={`/workshops#${entry.slug}`}>Workshop</TextLink>
                      </li>
                    ) : null}
                    {lectureSlug && entry.type === "lecture" ? (
                      <li>
                        <TextLink href={`/lectures#${lectureSlug}`}>Lecture</TextLink>
                      </li>
                    ) : null}
                    {lectureSlug && entry.type === "workshop" ? (
                      <li>
                        <TextLink href={`/lectures#${lectureSlug}`}>Lecture</TextLink>
                      </li>
                    ) : null}
                    {assignmentSlug &&
                    (entry.type === "release" || entry.type === "deadline") ? (
                      <li>
                        <TextLink href={`/assignments#${assignmentSlug}`}>
                          Assignments
                        </TextLink>
                      </li>
                    ) : null}
                    {!lectureSlug && !assignmentSlug && entry.type !== "workshop" ? (
                      <li>
                        <span className={styles.muted}>—</span>
                      </li>
                    ) : null}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
