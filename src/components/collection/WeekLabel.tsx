import { cx } from "@/lib/cx";

import styles from "./WeekLabel.module.css";

type WeekLabelProps = {
  week?: number;
  dateLabel?: string;
  className?: string;
};

export function WeekLabel({ week, dateLabel, className }: WeekLabelProps) {
  if (week == null && !dateLabel) {
    return null;
  }

  return (
    <p className={cx(styles.label, className)}>
      {week != null ? `Week ${week}` : null}
      {week != null && dateLabel ? <span className={styles.secondary}>{dateLabel}</span> : null}
      {week == null && dateLabel ? dateLabel : null}
    </p>
  );
}
