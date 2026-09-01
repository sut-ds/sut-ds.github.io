import type { Metadata } from "next";

import { ContentPage } from "@/components/foundation/ContentPage";
import { OnThisPage } from "@/components/foundation/OnThisPage";
import { Prose } from "@/components/foundation/Prose";
import { TextLink } from "@/components/foundation/TextLink";
import { getChrome, getCourse, getStaffByRole, getSyllabus } from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

import styles from "./syllabus.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.syllabus,
  chrome.pageSupportingSentences.syllabus,
  "/syllabus/"
);

function asList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default function SyllabusPage() {
  const syllabus = getSyllabus();
  const course = getCourse();
  const chrome = getChrome();
  const { instructors } = getStaffByRole();

  const objectives = syllabus.objectives ?? course.objectives ?? [];
  const prerequisites = asList(syllabus.prerequisites ?? course.prerequisites);
  const phases = syllabus.phases ?? [];
  const assessments = syllabus.assessments ?? [];

  const onThisPage = [
    { id: "overview", label: "Overview" },
    objectives.length > 0 ? { id: "objectives", label: "Learning objectives" } : null,
    prerequisites.length > 0 ? { id: "prerequisites", label: "Prerequisites" } : null,
    { id: "structure", label: "Course structure" },
    { id: "grading", label: "Evaluation" },
    { id: "policies", label: "Policies" },
    { id: "next-steps", label: "Where to go next" },
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.syllabus },
  ];

  return (
    <ContentPage
      title={chrome.navLabels.syllabus}
      description={chrome.pageSupportingSentences.syllabus}
      breadcrumbs={breadcrumbs}
    >
      <div className={styles.layout}>
        <OnThisPage items={onThisPage} />

        <div className={styles.main}>
          <section
            id="overview"
            className={styles.section}
            aria-labelledby="syllabus-overview"
          >
            <p className={styles.kicker}>Course reference</p>
            <h2 className={styles.sectionTitle} id="syllabus-overview">
              Overview
            </h2>
            {syllabus.lead ? (
              <Prose lead>
                <p>{syllabus.lead}</p>
              </Prose>
            ) : null}
            <Prose className={styles.overviewBody}>
              <p>{syllabus.overview}</p>
              {instructors.length > 0 ? (
                <p>
                  Instructors are{" "}
                  {instructors.map((member, index) => (
                    <span key={member.id}>
                      {index > 0
                        ? index === instructors.length - 1
                          ? " and "
                          : ", "
                        : null}
                      <TextLink href={`/staff#${member.slug}`}>
                        {member.name}
                      </TextLink>
                    </span>
                  ))}
                  .
                </p>
              ) : null}
            </Prose>
          </section>

          {objectives.length > 0 ? (
            <section
              id="objectives"
              className={styles.section}
              aria-labelledby="syllabus-objectives"
            >
              <h2 className={styles.sectionTitle} id="syllabus-objectives">
                Learning objectives
              </h2>
              <p className={styles.sectionLead}>
                By the end of the course, you should be able to:
              </p>
              <ol className={styles.objectiveList}>
                {objectives.map((item, index) => (
                  <li key={item} className={styles.objectiveItem}>
                    <span className={styles.objectiveIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {prerequisites.length > 0 ? (
            <section
              id="prerequisites"
              className={styles.section}
              aria-labelledby="syllabus-prerequisites"
            >
              <h2 className={styles.sectionTitle} id="syllabus-prerequisites">
                Prerequisites
              </h2>
              <p className={styles.sectionLead}>
                Recommended background before the first weeks:
              </p>
              <ul className={styles.checkList}>
                {prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section
            id="structure"
            className={styles.section}
            aria-labelledby="syllabus-structure"
          >
            <h2 className={styles.sectionTitle} id="syllabus-structure">
              Course structure
            </h2>
            <Prose>
              <p>{syllabus.structure}</p>
            </Prose>
            {phases.length > 0 ? (
              <ol className={styles.phaseList}>
                {phases.map((phase, index) => (
                  <li key={phase.title} className={styles.phaseItem}>
                    <span className={styles.phaseIndex} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className={styles.phaseTitle}>{phase.title}</h3>
                      <p className={styles.phaseBody}>{phase.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
            <p className={styles.inlineLink}>
              Full session order:{" "}
              <TextLink href="/lectures">{chrome.navLabels.lectures}</TextLink>
            </p>
          </section>

          <section
            id="grading"
            className={styles.section}
            aria-labelledby="syllabus-grading"
          >
            <h2 className={styles.sectionTitle} id="syllabus-grading">
              Evaluation / grading
            </h2>
            <Prose>
              <p>{syllabus.grading}</p>
            </Prose>
            {assessments.length > 0 ? (
              <div className={styles.gradingWrap}>
                <table className={styles.gradingTable}>
                  <caption className={styles.gradingCaption}>
                    Grade components for Foundations of Data Science
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Component</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((item) => (
                      <tr key={item.title}>
                        <th scope="row" className={styles.gradingComponent}>
                          {item.title}
                        </th>
                        <td className={styles.gradingWeight}>
                          {item.weight ?? "TBD"}
                        </td>
                        <td className={styles.gradingDetail}>{item.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {syllabus.gradingNote ? (
              <aside className={styles.callout} aria-label="Grading note">
                <p className={styles.calloutLabel}>Note</p>
                <p className={styles.calloutBody}>{syllabus.gradingNote}</p>
              </aside>
            ) : null}
            <p className={styles.inlineLink}>
              Deadlines and owners:{" "}
              <TextLink href="/assignments">{chrome.navLabels.assignments}</TextLink>
            </p>
          </section>

          <section
            id="policies"
            className={styles.section}
            aria-labelledby="syllabus-policies"
          >
            <h2 className={styles.sectionTitle} id="syllabus-policies">
              Policies
            </h2>
            <Prose>
              <p>{syllabus.policies}</p>
            </Prose>
            <p className={styles.inlineLink}>
              Contacts: <TextLink href="/staff">{chrome.navLabels.staff}</TextLink>
              {" · "}
              <TextLink href="/faq">{chrome.utilityLabels.faq}</TextLink>
            </p>
          </section>

          <section
            id="next-steps"
            className={styles.next}
            aria-labelledby="syllabus-next"
          >
            <h2 className={styles.nextTitle} id="syllabus-next">
              Where to go next
            </h2>
            <p className={styles.nextLead}>
              Use the syllabus as the roadmap; open these pages for day-to-day work.
            </p>
            <ul className={styles.nextList}>
              <li>
                <TextLink href="/lectures">{chrome.navLabels.lectures}</TextLink>
                <span>Session timeline, presenters, lecture materials</span>
              </li>
              <li>
                <TextLink href="/workshops">{chrome.navLabels.workshops}</TextLink>
                <span>TA-led sessions, videos, notebooks</span>
              </li>
              <li>
                <TextLink href="/assignments">{chrome.navLabels.assignments}</TextLink>
                <span>Homeworks, project phases, responsible TAs</span>
              </li>
              <li>
                <TextLink href="/schedule">{chrome.navLabels.schedule}</TextLink>
                <span>Calendar dates when published</span>
              </li>
              <li>
                <TextLink href="/staff">{chrome.navLabels.staff}</TextLink>
                <span>Instructors, contact channels</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </ContentPage>
  );
}
