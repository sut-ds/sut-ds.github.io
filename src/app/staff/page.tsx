import type { Metadata } from "next";

import { StaffPerson } from "@/components/domain/StaffPerson";
import { StaffPersonSchema } from "@/components/schema/StaffPersonSchema";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { Prose } from "@/components/foundation/Prose";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { getChrome, getContact, getStaffByRole } from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";
import type { StaffMember } from "@/types/content";

import styles from "./staff.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.staff,
  chrome.pageSupportingSentences.staff,
  "/staff/"
);

function StaffGroup({
  title,
  id,
  people,
}: {
  title: string;
  id: string;
  people: StaffMember[];
}) {
  if (people.length === 0) {
    return null;
  }

  return (
    <section className={styles.group} aria-labelledby={id}>
      <SectionHeader id={id} title={title} />
      <ul className={styles.groupList}>
        {people.map((person) => (
          <li key={person.id}>
            <StaffPerson person={person} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function StaffPage() {
  const chrome = getChrome();
  const contact = getContact();
  const { instructors, teachingAssistants, other } = getStaffByRole();
  const hasStaff =
    instructors.length + teachingAssistants.length + other.length > 0;
  
  // Collect all staff for schema generation
  const allStaff = [...instructors, ...teachingAssistants, ...other];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.staff },
  ];

  return (
    <>
      {/* Person schemas for each staff member */}
      {allStaff.map((person) => (
        <StaffPersonSchema key={person.id} staff={person} />
      ))}
      
      <ContentPage
        title={chrome.navLabels.staff}
        description={chrome.pageSupportingSentences.staff}
        breadcrumbs={breadcrumbs}
    >
      <section className={styles.contact} id="contact" aria-labelledby="staff-contact">
        <SectionHeader id="staff-contact" title="Contact guidance" />
        <Prose>
          <p>{contact.body}</p>
        </Prose>
      </section>

      {hasStaff ? (
        <>
          <StaffGroup title="Instructors" id="instructors" people={instructors} />
          <StaffGroup
            title="Teaching assistants"
            id="teaching-assistants"
            people={teachingAssistants}
          />
          <StaffGroup title="Course staff" id="other-staff" people={other} />
        </>
      ) : (
        <EmptyState
          message={chrome.emptyStates.staff}
          links={[{ href: "/faq", label: chrome.utilityLabels.faq }]}
        />
      )}

      <section className={styles.help} aria-labelledby="staff-help">
        <SectionHeader id="staff-help" title="Still need help?" />
        <ul className={styles.helpList}>
          <li>
            <TextLink href="/faq">{chrome.utilityLabels.faq}</TextLink>
          </li>
          <li>
            <TextLink href="/syllabus#policies">Course policies</TextLink>
          </li>
        </ul>
      </section>
    </ContentPage>
    </>
  );
}
