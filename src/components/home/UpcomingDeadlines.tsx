import {
  DeadlineText,
  deadlineEmphasis,
} from "@/components/collection/DeadlineText";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import type { Assignment } from "@/types/content";

import styles from "./UpcomingDeadlines.module.css";

type UpcomingDeadlinesProps = {
  deadlines: Assignment[];
  title?: string;
  className?: string;
};

/** Returns null when there are no upcoming deadlines. */
export function UpcomingDeadlines({
  deadlines,
  title = "Upcoming deadlines",
  className,
}: UpcomingDeadlinesProps) {
  if (deadlines.length === 0) {
    return null;
  }

  return (
    <section
      className={cx(styles.section, className)}
      aria-labelledby="home-upcoming-deadlines"
    >
      <SectionHeader id="home-upcoming-deadlines" title={title} />
      <ul className={styles.list} aria-label={title}>
        {deadlines.map((item) => (
          <li key={item.slug} className={styles.item}>
            <h3 className={styles.title}>
              <TextLink href="/assignments">{item.title}</TextLink>
            </h3>
            {item.dueAt ? (
              <DeadlineText
                dueAt={item.dueAt}
                emphasis={deadlineEmphasis(item.dueAt)}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
