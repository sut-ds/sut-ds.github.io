import type { Metadata } from "next";

import { CollectionList } from "@/components/collection/CollectionList";
import { LectureRow } from "@/components/collection/LectureRow";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import {
  getAssignmentsByIds,
  getChrome,
  getResourcesByIds,
  getPublishedLectures,
  getPublishedStaff,
  getWorkshopByLectureId,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

import styles from "./lectures.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.lectures,
  chrome.pageSupportingSentences.lectures,
  "/lectures/"
);

function presenterHrefFor(
  presenter: string | undefined,
  staff: ReturnType<typeof getPublishedStaff>,
): string | undefined {
  if (!presenter) return undefined;
  const needle = presenter.toLowerCase().replace(/^dr\.?\s+/, "").trim();
  const match = staff.find((member) => {
    const name = member.name.toLowerCase().replace(/^dr\.?\s+/, "").trim();
    return needle === name || needle.includes(name) || name.includes(needle);
  });
  return match ? `/staff#${match.slug}` : undefined;
}

export default function LecturesPage() {
  const chrome = getChrome();
  const lectures = getPublishedLectures();
  const staff = getPublishedStaff();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.lectures },
  ];

  return (
    <ContentPage
      title={chrome.navLabels.lectures}
      description={chrome.pageSupportingSentences.lectures}
      breadcrumbs={breadcrumbs}
    >
      {lectures.length === 0 ? (
        <EmptyState
          message={chrome.emptyStates.lectures}
          links={[
            { href: "/schedule", label: chrome.navLabels.schedule },
            { href: "/resources", label: chrome.navLabels.resources },
          ]}
        />
      ) : (
        <CollectionList
          className={styles.timeline}
          aria-label="Lecture sequence"
        >
          {lectures.map((lecture, index) => {
            const workshop = getWorkshopByLectureId(lecture.slug);
            return (
              <LectureRow
                key={lecture.slug}
                lecture={lecture}
                isLast={index === lectures.length - 1}
                presenterHref={presenterHrefFor(lecture.presenter, staff)}
                workshopHref={
                  workshop ? `/workshops#${workshop.slug}` : undefined
                }
                relatedAssignmentLinks={getAssignmentsByIds(
                  lecture.assignmentIds,
                ).map((assignment) => ({
                  href: `/assignments#${assignment.slug}`,
                  label: assignment.title,
                }))}
                relatedResources={getResourcesByIds(lecture.resourceIds)}
              />
            );
          })}
        </CollectionList>
      )}
    </ContentPage>
  );
}
