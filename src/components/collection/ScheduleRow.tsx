import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import { formatDisplayDate } from "@/lib/content/dates";
import type { ScheduleEntry } from "@/types/content";

import styles from "./ScheduleRow.module.css";

export type RelatedLink = {
  href: string;
  label: string;
};

type ScheduleRowProps = {
  entry: ScheduleEntry;
  relatedLinks?: RelatedLink[];
  isLast?: boolean;
  className?: string;
};

export function ScheduleRow({
  entry,
  relatedLinks = [],
  isLast = false,
  className,
}: ScheduleRowProps) {
  const session = entry.order;
  const dateLabel = entry.date ? formatDisplayDate(entry.date) : undefined;

  return (
    <li
      className={cx(styles.item, entry.isCurrent && styles.current, isLast && styles.last, className)}
      id={entry.slug}
    >
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.index}>
          {session != null ? String(session).padStart(2, "0") : "·"}
        </span>
        {!isLast ? <span className={styles.line} /> : null}
      </div>

      <article className={styles.body}>
        <div className={styles.meta}>
          {dateLabel ? (
            <span className={styles.date}>{dateLabel}</span>
          ) : (
            <span className={styles.datePending}>Date TBD</span>
          )}
          {entry.type ? <span className={styles.type}>{entry.type}</span> : null}
          {entry.isCurrent ? <span className={styles.currentTag}>Current</span> : null}
        </div>

        <h2 className={styles.title}>{entry.title}</h2>

        {entry.description ? <p className={styles.summary}>{entry.description}</p> : null}

        {relatedLinks.length > 0 ? (
          <ul className={styles.related}>
            {relatedLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </li>
  );
}
