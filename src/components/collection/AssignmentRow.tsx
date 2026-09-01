import {
  DeadlineText,
  deadlineEmphasis,
} from "@/components/collection/DeadlineText";
import { MaterialLinks } from "@/components/collection/MaterialLinks";
import { StatusLabel } from "@/components/foundation/StatusLabel";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import type { Assignment, StaffMember } from "@/types/content";

import styles from "./AssignmentRow.module.css";
import type { RelatedLink } from "./ScheduleRow";

type AssignmentRowProps = {
  assignment: Assignment;
  href?: string;
  relatedLectureLinks?: RelatedLink[];
  responsibleTas?: StaffMember[];
  className?: string;
  /** Display index in the rail when no logo (e.g. "01", "P1") */
  indexLabel?: string;
};

function kindLabel(assignment: Assignment): string {
  if (assignment.kind === "project") {
    return "Project";
  }
  if (assignment.number != null) {
    return `Homework ${assignment.number}`;
  }
  return "Assignment";
}

function statusVariant(
  status: Assignment["status"],
): "brand" | "accent" | "warm" | "neutral" {
  if (status === "open") return "accent";
  if (status === "upcoming") return "brand";
  if (status === "closed") return "neutral";
  return "neutral";
}

export function AssignmentRow({
  assignment,
  href,
  relatedLectureLinks = [],
  responsibleTas = [],
  className,
  indexLabel,
}: AssignmentRowProps) {
  const hasMaterials = Boolean(assignment.materials && assignment.materials.length > 0);
  const hasLogo = Boolean(assignment.logo?.src);
  const showStatus =
    Boolean(assignment.status) &&
    assignment.status !== "TBD" &&
    !(assignment.status === "upcoming" && !assignment.dueAt);
  const railLabel =
    indexLabel ??
    (assignment.number != null
      ? String(assignment.number).padStart(2, "0")
      : assignment.kind === "project"
        ? "P"
        : "·");

  const title = href ? (
    <TextLink href={href}>{assignment.title}</TextLink>
  ) : (
    assignment.title
  );

  return (
    <li className={cx(styles.item, className)} id={assignment.slug}>
      <div className={styles.mark} aria-hidden={hasLogo ? undefined : true}>
        {hasLogo && assignment.logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- static assignment marks
          <img
            className={styles.logo}
            src={assignment.logo.src}
            alt={assignment.logo.alt}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.index}>{railLabel}</span>
        )}
      </div>

      <article className={styles.body}>
        <div className={styles.top}>
          <div className={styles.heading}>
            <p className={styles.kind}>{kindLabel(assignment)}</p>
            <h3 className={styles.title}>{title}</h3>
          </div>
          <div className={styles.deadline}>
            {assignment.dueAt ? (
              <DeadlineText
                dueAt={assignment.dueAt}
                emphasis={deadlineEmphasis(assignment.dueAt)}
              />
            ) : (
              <StatusLabel variant="neutral">Deadline TBD</StatusLabel>
            )}
            {showStatus ? (
              <StatusLabel variant={statusVariant(assignment.status)}>
                {assignment.status}
              </StatusLabel>
            ) : null}
          </div>
        </div>

        {assignment.summary ? (
          <p className={styles.summary}>{assignment.summary}</p>
        ) : null}
        {assignment.submissionNote ? (
          <p className={styles.note}>{assignment.submissionNote}</p>
        ) : null}

        {responsibleTas.length > 0 ? (
          <p className={styles.owners}>
            <span className={styles.ownersLabel}>
              {responsibleTas.length === 1 ? "Responsible TA" : "Responsible TAs"}
            </span>
            {responsibleTas.map((ta, index) => (
              <span key={ta.id}>
                {index > 0 ? ", " : " "}
                <TextLink href={`/staff#${ta.slug}`}>{ta.name}</TextLink>
              </span>
            ))}
          </p>
        ) : null}

        {relatedLectureLinks.length > 0 ? (
          <ul className={styles.related} aria-label="Related lectures">
            {relatedLectureLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        ) : null}

        {hasMaterials ? (
          <div className={styles.materials}>
            <MaterialLinks materials={assignment.materials ?? []} />
          </div>
        ) : null}
      </article>
    </li>
  );
}
