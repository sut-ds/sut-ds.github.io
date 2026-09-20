import type { Metadata } from "next";

import { StaffPerson } from "@/components/domain/StaffPerson";
import { StaffPersonSchema } from "@/components/schema/StaffPersonSchema";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { OnThisPage } from "@/components/foundation/OnThisPage";
import { Prose } from "@/components/foundation/Prose";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import {
  getChrome,
  getContact,
  getStaffFocusSections,
  type StaffFocusSection,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

import styles from "./staff.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.staff,
  chrome.pageSupportingSentences.staff,
  "/staff/"
);

function StaffGroup({ section }: { section: StaffFocusSection }) {
  return (
    <section className={styles.group} aria-labelledby={section.id}>
      <SectionHeader id={section.id} title={section.title} />
      <ul className={styles.groupList}>
        {section.members.map((person) => (
          <li key={`${section.id}-${person.id}`}>
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
  const focusSections = getStaffFocusSections();
  const hasStaff = focusSections.length > 0;

  const allStaff = Array.from(
    new Map(
      focusSections.flatMap((section) => section.members).map((person) => [person.id, person]),
    ).values(),
  );

  const navSections = [
    ...focusSections.map((section) => ({
      id: section.id,
      label: section.title,
    })),
    { id: "contact", label: "Contact guidance" },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.staff },
  ];

  return (
    <>
      {allStaff.map((person) => (
        <StaffPersonSchema key={person.id} staff={person} />
      ))}

      <ContentPage
        title={chrome.navLabels.staff}
        description={chrome.pageSupportingSentences.staff}
        breadcrumbs={breadcrumbs}
      >
        <div className={styles.layout}>
          {hasStaff ? <OnThisPage items={navSections} label="Staff roles" /> : null}

          <div className={styles.main}>
            {hasStaff ? (
              focusSections.map((section) => (
                <StaffGroup key={section.id} section={section} />
              ))
            ) : (
              <EmptyState
                message={chrome.emptyStates.staff}
                links={[{ href: "/faq", label: chrome.utilityLabels.faq }]}
              />
            )}

            <section
              className={styles.contact}
              id="contact"
              aria-labelledby="staff-contact"
            >
              <SectionHeader id="staff-contact" title="Contact guidance" />
              <Prose>
                <p>{contact.body}</p>
              </Prose>
            </section>

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
          </div>
        </div>
      </ContentPage>
    </>
  );
}
