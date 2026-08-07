import { AnnouncementItem } from "@/components/collection/AnnouncementItem";
import { CollectionList } from "@/components/collection/CollectionList";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { cx } from "@/lib/cx";
import type { Announcement } from "@/types/content";

import styles from "./CurrentSignal.module.css";

type CurrentSignalProps = {
  announcements: Announcement[];
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

/** Returns null when empty — do not leave a blank announcements panel. */
export function CurrentSignal({
  announcements,
  title = "Announcements",
  viewAllHref = "/announcements",
  viewAllLabel = "View all",
  className,
}: CurrentSignalProps) {
  if (announcements.length === 0) {
    return null;
  }

  return (
    <section
      className={cx(styles.section, className)}
      aria-labelledby="home-current-signal"
    >
      <SectionHeader
        id="home-current-signal"
        title={title}
        actionHref={viewAllHref}
        actionLabel={viewAllLabel}
      />
      <CollectionList
        className={styles.list}
        variant="compact"
        aria-label={title}
      >
        {announcements.map((item) => (
          <li key={item.id}>
            <AnnouncementItem
              announcement={item}
              variant="compact"
              href={viewAllHref}
            />
          </li>
        ))}
      </CollectionList>
    </section>
  );
}
