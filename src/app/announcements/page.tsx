import type { Metadata } from "next";

import { AnnouncementItem } from "@/components/collection/AnnouncementItem";
import { CollectionList } from "@/components/collection/CollectionList";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import {
  getAssignmentsByIds,
  getChrome,
  getLecturesByIds,
  getPublishedAnnouncements,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.announcements,
  chrome.pageSupportingSentences.announcements,
  "/announcements/"
);

export default function AnnouncementsPage() {
  const chrome = getChrome();
  const announcements = getPublishedAnnouncements();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.utilityLabels.announcements },
  ];

  return (
    <ContentPage
      title={chrome.utilityLabels.announcements}
      description={chrome.pageSupportingSentences.announcements}
      breadcrumbs={breadcrumbs}
    >
      {announcements.length === 0 ? (
        <EmptyState
          message={chrome.emptyStates.announcements}
          links={[{ href: "/", label: chrome.navLabels.home }]}
        />
      ) : (
        <CollectionList aria-label="Announcements">
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <AnnouncementItem
                announcement={announcement}
                variant="full"
                relatedLinks={[
                  ...getLecturesByIds(announcement.relatedLectureIds).map((lecture) => ({
                    href: "/lectures",
                    label: lecture.title,
                  })),
                  ...getAssignmentsByIds(announcement.relatedAssignmentIds).map(
                    (assignment) => ({
                      href: "/assignments",
                      label: assignment.title,
                    }),
                  ),
                ]}
              />
            </li>
          ))}
        </CollectionList>
      )}
    </ContentPage>
  );
}
