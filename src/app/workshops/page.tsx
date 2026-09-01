import type { Metadata } from "next";

import { WorkshopRow } from "@/components/collection/WorkshopRow";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { OnThisPage } from "@/components/foundation/OnThisPage";
import { TextLink } from "@/components/foundation/TextLink";
import {
  getChrome,
  getLectureBySlug,
  getPublishedWorkshops,
  getStaffByIds,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

import styles from "./workshops.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.workshops,
  chrome.pageSupportingSentences.workshops,
  "/workshops/"
);

export default function WorkshopsPage() {
  const chrome = getChrome();
  const workshops = getPublishedWorkshops();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.workshops },
  ];

  const onThisPage = [
    { id: "studio", label: "How labs work" },
    ...workshops.map((workshop) => ({
      id: workshop.slug,
      label: workshop.title,
    })),
    { id: "elsewhere", label: "Elsewhere" },
  ];

  return (
    <ContentPage
      title={chrome.navLabels.workshops}
      description={chrome.pageSupportingSentences.workshops}
      breadcrumbs={breadcrumbs}
    >
      {workshops.length === 0 ? (
        <EmptyState
          message={chrome.emptyStates.workshops}
          links={[
            { href: "/lectures", label: chrome.navLabels.lectures },
            { href: "/schedule", label: chrome.navLabels.schedule },
          ]}
        />
      ) : (
        <div className={styles.layout}>
          <OnThisPage items={onThisPage} label="Lab menu" />

          <div className={styles.main}>
            <section
              id="studio"
              className={styles.intro}
              aria-labelledby="workshops-studio"
            >
              <h2 className={styles.introTitle} id="workshops-studio">
                Studio labs, not lecture notes
              </h2>
              <p className={styles.introBody}>
                Workshops are TA-led practice sessions. Jump by tool from the lab
                menu, then watch the recording and open notebooks or slides when
                they are published.
              </p>
              <ol className={styles.steps}>
                <li className={styles.step}>
                  <span className={styles.stepIndex}>01</span>
                  <span className={styles.stepLabel}>Watch</span>
                  <p className={styles.stepBody}>
                    Open the workshop recording when the TA posts it.
                  </p>
                </li>
                <li className={styles.step}>
                  <span className={styles.stepIndex}>02</span>
                  <span className={styles.stepLabel}>Practice</span>
                  <p className={styles.stepBody}>
                    Work through notebooks, slides, or starter files.
                  </p>
                </li>
                <li className={styles.step}>
                  <span className={styles.stepIndex}>03</span>
                  <span className={styles.stepLabel}>Ask</span>
                  <p className={styles.stepBody}>
                    Reach the listed TA on Staff when you get stuck.
                  </p>
                </li>
              </ol>
            </section>

            <ul className={styles.board} aria-label="Workshop labs">
              {workshops.map((workshop) => {
                const instructor = workshop.instructorId
                  ? getStaffByIds([workshop.instructorId])[0]
                  : undefined;
                const relatedLecture = workshop.lectureId
                  ? getLectureBySlug(workshop.lectureId)
                  : undefined;

                return (
                  <li key={workshop.slug}>
                    <WorkshopRow
                      workshop={workshop}
                      instructor={instructor}
                      relatedLecture={relatedLecture}
                    />
                  </li>
                );
              })}
            </ul>

            <section
              id="elsewhere"
              className={styles.help}
              aria-labelledby="workshops-elsewhere"
            >
              <h2 className={styles.helpTitle} id="workshops-elsewhere">
                Looking for theory instead?
              </h2>
              <p className={styles.helpBody}>
                Lecture topics and slides live on Lectures. Calendar placement is
                on Schedule. Tool documentation is under Resources.
              </p>
              <ul className={styles.helpLinks}>
                <li>
                  <TextLink href="/lectures">{chrome.navLabels.lectures}</TextLink>
                </li>
                <li>
                  <TextLink href="/schedule">{chrome.navLabels.schedule}</TextLink>
                </li>
                <li>
                  <TextLink href="/resources">{chrome.navLabels.resources}</TextLink>
                </li>
                <li>
                  <TextLink href="/staff">{chrome.navLabels.staff}</TextLink>
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </ContentPage>
  );
}
