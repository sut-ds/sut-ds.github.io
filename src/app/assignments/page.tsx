import type { Metadata } from "next";

import {
  DeadlineText,
  deadlineEmphasis,
} from "@/components/collection/DeadlineText";
import { AssignmentRow } from "@/components/collection/AssignmentRow";
import { AssignmentSchema } from "@/components/schema/AssignmentSchema";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { OnThisPage } from "@/components/foundation/OnThisPage";
import { StatusLabel } from "@/components/foundation/StatusLabel";
import { TextLink } from "@/components/foundation/TextLink";
import {
  getChrome,
  getLecturesByIds,
  getPublishedAssignments,
  getPublishedProjects,
  getStaffByIds,
} from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";
import type { Assignment } from "@/types/content";

import styles from "./assignments.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.assignments,
  chrome.pageSupportingSentences.assignments,
  "/assignments/"
);

function relatedLectureLinks(assignment: Assignment) {
  return getLecturesByIds(assignment.lectureIds).map((lecture) => ({
    href: `/lectures#${lecture.slug}`,
    label: lecture.title,
  }));
}

function overviewKind(assignment: Assignment): string {
  if (assignment.kind === "project") return "Project";
  if (assignment.number != null) return `HW ${assignment.number}`;
  return "Assignment";
}

function projectIndexLabel(index: number): string {
  return `P${index + 1}`;
}

export default function AssignmentsPage() {
  const chrome = getChrome();
  const homeworks = getPublishedAssignments().filter(
    (assignment) => assignment.kind !== "project",
  );
  const projects = getPublishedProjects();
  const overviewItems = [...homeworks, ...projects].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
  );
  const isEmpty = homeworks.length === 0 && projects.length === 0;

  const onThisPage = [
    overviewItems.length > 0 ? { id: "overview", label: "At a glance" } : null,
    homeworks.length > 0
      ? { id: "homework", label: `Homework (${homeworks.length})` }
      : null,
    projects.length > 0
      ? { id: "projects", label: `Projects (${projects.length})` }
      : null,
    { id: "policies", label: "Policies & help" },
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.assignments },
  ];

  return (
    <>
      {/* EducationEvent schemas for each assignment */}
      {overviewItems.map((assignment) => (
        <AssignmentSchema key={assignment.slug} assignment={assignment} />
      ))}
      
      <ContentPage
        title={chrome.navLabels.assignments}
        description={chrome.pageSupportingSentences.assignments}
        breadcrumbs={breadcrumbs}
      >
      {isEmpty ? (
        <EmptyState
          message={chrome.emptyStates.assignments}
          links={[
            { href: "/syllabus", label: chrome.navLabels.syllabus },
            { href: "/lectures", label: chrome.navLabels.lectures },
          ]}
        />
      ) : (
        <div className={styles.layout}>
          <OnThisPage items={onThisPage} />

          <div className={styles.main}>
            <p className={styles.curationNote}>
              Scan deadlines in the overview, then open a homework or project for
              the brief, materials, and responsible TA. Official late-work and
              integrity rules live on the Syllabus.
            </p>

            {overviewItems.length > 0 ? (
              <section
                id="overview"
                className={styles.section}
                aria-labelledby="assignments-overview"
              >
                <p className={styles.kicker}>Deadlines</p>
                <div className={styles.sectionHeader}>
                  <h2
                    className={styles.sectionTitle}
                    id="assignments-overview"
                  >
                    At a glance
                  </h2>
                  <span className={styles.count}>{overviewItems.length}</span>
                </div>
                <p className={styles.sectionLead}>
                  Quick scan of published coursework. Jump to a row’s detail
                  section below for context and materials.
                </p>
                <div className={styles.overviewWrap}>
                  <table className={styles.overview}>
                    <thead>
                      <tr>
                        <th scope="col">Work</th>
                        <th scope="col">Type</th>
                        <th scope="col">Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overviewItems.map((item) => (
                        <tr key={item.slug}>
                          <td>
                            <TextLink
                              href={`#${item.slug}`}
                              className={styles.workTitle}
                            >
                              {item.title}
                            </TextLink>
                          </td>
                          <td className={styles.kindCell}>
                            {overviewKind(item)}
                          </td>
                          <td className={styles.dueCell}>
                            {item.dueAt ? (
                              <DeadlineText
                                dueAt={item.dueAt}
                                emphasis={deadlineEmphasis(item.dueAt)}
                              />
                            ) : (
                              <StatusLabel variant="neutral">TBD</StatusLabel>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {homeworks.length > 0 ? (
              <section
                id="homework"
                className={styles.section}
                aria-labelledby="assignments-homework"
              >
                <p className={styles.kicker}>Problem sets</p>
                <div className={styles.sectionHeader}>
                  <h2
                    className={styles.sectionTitle}
                    id="assignments-homework"
                  >
                    Homework
                  </h2>
                  <span className={styles.count}>{homeworks.length}</span>
                </div>
                <p className={styles.sectionLead}>
                  Numbered problem sets aligned with lecture modules. Specs and
                  starter materials appear here as they are published.
                </p>
                <ul className={styles.list} aria-label="Homework">
                  {homeworks.map((assignment) => (
                    <AssignmentRow
                      key={assignment.slug}
                      assignment={assignment}
                      indexLabel={
                        assignment.number != null
                          ? String(assignment.number).padStart(2, "0")
                          : undefined
                      }
                      responsibleTas={getStaffByIds(assignment.taIds)}
                      relatedLectureLinks={relatedLectureLinks(assignment)}
                    />
                  ))}
                </ul>
              </section>
            ) : null}

            {projects.length > 0 ? (
              <section
                id="projects"
                className={styles.section}
                aria-labelledby="assignments-projects"
              >
                <p className={styles.kicker}>Course project</p>
                <div className={styles.sectionHeader}>
                  <h2
                    className={styles.sectionTitle}
                    id="assignments-projects"
                  >
                    Projects
                  </h2>
                  <span className={styles.count}>{projects.length}</span>
                </div>
                <p className={styles.sectionLead}>
                  Orientation, phased milestones, and the final presentation —
                  kept inline with homework so the full coursework path stays in
                  one place.
                </p>
                <ul className={styles.list} aria-label="Projects">
                  {projects.map((project, index) => (
                    <AssignmentRow
                      key={project.slug}
                      assignment={project}
                      indexLabel={projectIndexLabel(index)}
                      responsibleTas={getStaffByIds(project.taIds)}
                      relatedLectureLinks={relatedLectureLinks(project)}
                    />
                  ))}
                </ul>
              </section>
            ) : null}

            <section
              id="policies"
              className={styles.help}
              aria-labelledby="assignments-policies"
            >
              <h2 className={styles.helpTitle} id="assignments-policies">
                Policies &amp; help
              </h2>
              <p className={styles.helpBody}>
                Late work, integrity, and grading notes belong on the Syllabus.
                Use Schedule for calendar context, and Staff or FAQ when you need
                a person or a quick answer.
              </p>
              <ul className={styles.helpLinks}>
                <li>
                  <TextLink href="/syllabus">{chrome.navLabels.syllabus}</TextLink>
                </li>
                <li>
                  <TextLink href="/schedule">{chrome.navLabels.schedule}</TextLink>
                </li>
                <li>
                  <TextLink href="/faq">{chrome.utilityLabels.faq}</TextLink>
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
    </>
  );
}
