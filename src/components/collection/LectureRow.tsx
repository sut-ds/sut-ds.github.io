import { MaterialLinks } from "@/components/collection/MaterialLinks";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import { formatDisplayDate } from "@/lib/content/dates";
import type { Lecture } from "@/types/content";

import styles from "./LectureRow.module.css";
import type { RelatedLink } from "./ScheduleRow";

type LectureRowProps = {
  lecture: Lecture;
  href?: string;
  relatedAssignmentLinks?: RelatedLink[];
  presenterHref?: string;
  workshopHref?: string;
  isLast?: boolean;
  className?: string;
};

export function LectureRow({
  lecture,
  href,
  relatedAssignmentLinks = [],
  presenterHref,
  workshopHref,
  isLast = false,
  className,
}: LectureRowProps) {
  const hasMaterials = Boolean(lecture.materials && lecture.materials.length > 0);
  const session = lecture.order ?? undefined;
  const dateLabel = lecture.date ? formatDisplayDate(lecture.date) : undefined;

  return (
    <li className={cx(styles.item, isLast && styles.last, className)} id={lecture.slug}>
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.index}>
          {session != null ? String(session).padStart(2, "0") : "·"}
        </span>
        {!isLast ? <span className={styles.line} /> : null}
      </div>

      <article className={styles.body}>
        <div className={styles.meta}>
          {lecture.week != null ? (
            <span className={styles.week}>Week {lecture.week}</span>
          ) : null}
          {dateLabel ? <span className={styles.date}>{dateLabel}</span> : null}
          {lecture.week == null && !dateLabel ? (
            <span className={styles.week}>Session</span>
          ) : null}
        </div>

        <h2 className={styles.title}>
          {href ? <TextLink href={href}>{lecture.title}</TextLink> : lecture.title}
        </h2>

        {lecture.summary ? <p className={styles.summary}>{lecture.summary}</p> : null}

        {lecture.workshop || lecture.presenter ? (
          <dl className={styles.facts}>
            {lecture.workshop ? (
              <div className={styles.fact}>
                <dt>Workshop</dt>
                <dd>
                  {workshopHref ? (
                    <TextLink href={workshopHref} className={styles.workshop}>
                      {lecture.workshop}
                    </TextLink>
                  ) : (
                    <span className={styles.workshop}>{lecture.workshop}</span>
                  )}
                </dd>
              </div>
            ) : null}
            {lecture.presenter ? (
              <div className={styles.fact}>
                <dt>Presenter</dt>
                <dd>
                  {presenterHref ? (
                    <TextLink href={presenterHref}>{lecture.presenter}</TextLink>
                  ) : (
                    lecture.presenter
                  )}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {relatedAssignmentLinks.length > 0 ? (
          <ul className={styles.related}>
            {relatedAssignmentLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        ) : null}

        {lecture.readings && lecture.readings.length > 0 ? (
          <ul className={styles.related}>
            {lecture.readings.map((reading) => (
              <li key={reading.title}>
                {reading.href ? (
                  <TextLink href={reading.href} external>
                    {reading.title}
                  </TextLink>
                ) : (
                  reading.title
                )}
              </li>
            ))}
          </ul>
        ) : null}

        {hasMaterials ? (
          <div className={styles.actions}>
            <MaterialLinks materials={lecture.materials ?? []} />
          </div>
        ) : null}
      </article>
    </li>
  );
}
