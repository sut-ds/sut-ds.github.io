import { MaterialLinks } from "@/components/collection/MaterialLinks";
import { StatusLabel } from "@/components/foundation/StatusLabel";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import type { Lecture, StaffMember, Workshop } from "@/types/content";

import styles from "./WorkshopRow.module.css";

type WorkshopRowProps = {
  workshop: Workshop;
  instructor?: StaffMember;
  relatedLecture?: Lecture;
  className?: string;
};

function initialsFromName(name: string): string {
  const parts = name
    .replace(/^dr\.?\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function WorkshopRow({
  workshop,
  instructor,
  relatedLecture,
  className,
}: WorkshopRowProps) {
  const hasMaterials = Boolean(workshop.materials && workshop.materials.length > 0);
  const video = workshop.video;

  return (
    <article
      className={cx(styles.panel, className)}
      id={workshop.slug}
      aria-labelledby={`${workshop.slug}-title`}
    >
      <div className={styles.accent} aria-hidden="true" />

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.identity}>
            <p className={styles.kicker}>
              {workshop.week != null ? `Lab · Week ${workshop.week}` : "Hands-on lab"}
            </p>
            <h2 className={styles.title} id={`${workshop.slug}-title`}>
              {workshop.title}
            </h2>
          </div>

          <div className={styles.instructor}>
            {instructor ? (
              <>
                <span className={styles.avatar} aria-hidden="true">
                  {initialsFromName(instructor.name)}
                </span>
                <div className={styles.instructorText}>
                  <span className={styles.instructorLabel}>Led by</span>
                  <TextLink href={`/staff#${instructor.slug}`}>
                    {instructor.name}
                  </TextLink>
                </div>
              </>
            ) : (
              <div className={styles.instructorText}>
                <span className={styles.instructorLabel}>Led by</span>
                <StatusLabel variant="neutral">TA TBD</StatusLabel>
              </div>
            )}
          </div>
        </header>

        {workshop.summary ? (
          <p className={styles.summary}>{workshop.summary}</p>
        ) : null}

        {relatedLecture ? (
          <p className={styles.paired}>
            Builds on{" "}
            <TextLink href={`/lectures#${relatedLecture.slug}`}>
              {relatedLecture.title}
            </TextLink>
          </p>
        ) : null}

        <div className={styles.practice}>
          <div className={styles.practiceBlock}>
            <p className={styles.practiceLabel}>Watch</p>
            {video ? (
              <TextLink
                href={video.href}
                variant="material"
                external={video.external ?? true}
                className={styles.videoLink}
              >
                {video.label || "Workshop recording"}
              </TextLink>
            ) : (
              <StatusLabel variant="neutral">Recording not published yet</StatusLabel>
            )}
          </div>

          <div className={styles.practiceBlock}>
            <p className={styles.practiceLabel}>Practice</p>
            {hasMaterials ? (
              <MaterialLinks materials={workshop.materials ?? []} />
            ) : (
              <StatusLabel variant="neutral">Notebooks / slides TBD</StatusLabel>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
