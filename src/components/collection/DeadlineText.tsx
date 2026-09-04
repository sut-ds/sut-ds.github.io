import { cx } from "@/lib/cx";
import { formatPersianDate } from "@/lib/content/dates";

import styles from "./DeadlineText.module.css";

type DeadlineTextProps = {
  dueAt: string;
  /** Override formatted display if already formatted */
  label?: string;
  emphasis?: "upcoming" | "past" | "neutral";
  className?: string;
  prefix?: string;
};

export function DeadlineText({
  dueAt,
  label,
  emphasis = "upcoming",
  className,
  prefix = "Due",
}: DeadlineTextProps) {
  const display = label ?? formatPersianDate(dueAt);

  return (
    <time
      className={cx(styles.text, styles[emphasis], className)}
      dateTime={dueAt}
    >
      {prefix ? `${prefix} ${display}` : display}
    </time>
  );
}

export function deadlineEmphasis(dueAt: string, now = new Date()): "upcoming" | "past" {
  const due = new Date(dueAt).getTime();
  if (Number.isNaN(due)) {
    return "upcoming";
  }
  return due >= now.getTime() ? "upcoming" : "past";
}
