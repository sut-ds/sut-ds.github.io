import type { Metadata } from "next";

import { ScheduleTable } from "@/components/collection/ScheduleTable";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { TextLink } from "@/components/foundation/TextLink";
import { getChrome, getPublishedSchedule } from "@/lib/content";

import styles from "./schedule.module.css";

export const metadata: Metadata = {
  title: "Schedule",
};

export default function SchedulePage() {
  const chrome = getChrome();
  const entries = getPublishedSchedule();

  return (
    <ContentPage
      title={chrome.navLabels.schedule}
      description={chrome.pageSupportingSentences.schedule}
    >
      {entries.length === 0 ? (
        <EmptyState
          message={chrome.emptyStates.schedule}
          links={[
            { href: "/syllabus", label: chrome.navLabels.syllabus },
            { href: "/lectures", label: chrome.navLabels.lectures },
          ]}
        />
      ) : (
        <>
          <aside className={styles.note} aria-label="Schedule notes">
            <p className={styles.noteLabel}>Provisional calendar</p>
            <ul className={styles.legend} aria-label="Color legend">
              <li>
                <span className={styles.swatchLecture} aria-hidden="true" /> Lecture
              </li>
              <li>
                <span className={styles.swatchWorkshop} aria-hidden="true" /> Workshop
              </li>
              <li>
                <span className={styles.swatchRelease} aria-hidden="true" /> Release
              </li>
              <li>
                <span className={styles.swatchDeadline} aria-hidden="true" /> Deadline
              </li>
            </ul>
            <p className={styles.noteBody}>
              Details: <TextLink href="/lectures">{chrome.navLabels.lectures}</TextLink>
              {" · "}
              <TextLink href="/workshops">{chrome.navLabels.workshops}</TextLink>
              {" · "}
              <TextLink href="/assignments">{chrome.navLabels.assignments}</TextLink>
            </p>
          </aside>

          <ScheduleTable entries={entries} />
        </>
      )}
    </ContentPage>
  );
}
