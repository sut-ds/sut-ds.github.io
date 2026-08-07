import { Prose } from "@/components/foundation/Prose";
import { StatusLabel } from "@/components/foundation/StatusLabel";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import { formatDisplayDate } from "@/lib/content/dates";
import type { Announcement } from "@/types/content";

import styles from "./AnnouncementItem.module.css";
import type { RelatedLink } from "./ScheduleRow";

type AnnouncementItemProps = {
  announcement: Announcement;
  variant?: "compact" | "full";
  href?: string;
  relatedLinks?: RelatedLink[];
  className?: string;
};

export function AnnouncementItem({
  announcement,
  variant = "full",
  href,
  relatedLinks = [],
  className,
}: AnnouncementItemProps) {
  const excerpt = announcement.excerpt ?? announcement.body;

  return (
    <article
      className={cx(
        styles.item,
        variant === "compact" && styles.compact,
        announcement.pinned && styles.pinned,
        className,
      )}
      id={announcement.slug}
    >
      <h2 className={styles.title}>
        {href ? (
          <TextLink href={href}>{announcement.title}</TextLink>
        ) : (
          announcement.title
        )}
      </h2>
      <p className={styles.meta}>
        {announcement.pinned ? <StatusLabel variant="accent">Pinned</StatusLabel> : null}
        <time dateTime={announcement.date}>{formatDisplayDate(announcement.date)}</time>
      </p>
      {variant === "compact" ? (
        <p className={styles.excerpt}>{excerpt}</p>
      ) : (
        <div className={styles.body}>
          <Prose>
            <p>{announcement.body}</p>
          </Prose>
        </div>
      )}
      {relatedLinks.length > 0 ? (
        <ul className={styles.related}>
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <TextLink href={link.href}>{link.label}</TextLink>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
