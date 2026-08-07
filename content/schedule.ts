/**
 * Semester schedule table (provisional calendar).
 *
 * Dates span approximately **1 Mehr → end of Dey** (Persian calendar)
 * for the upcoming fall term and are placeholders until staff publish
 * the official calendar. Display uses Jalali + Gregorian labels.
 *
 * Rows include:
 * - one lecture session per syllabus topic
 * - one workshop row when the lecture lists a workshop
 * - homework/project **release** and **deadline** rows (color-coded in the UI)
 */
import { assignments } from "./assignments";
import { lectures } from "./lectures";
import { staff } from "./staff";
import { workshops } from "./workshops";
import type { ScheduleEntry } from "@/types/content";

/** Approx. 1 Mehr 1405 → 30 Dey 1405 (Gregorian placeholders). */
const TERM_START = Date.UTC(2026, 8, 23); // 23 Sep 2026
const TERM_END = Date.UTC(2027, 0, 20); // 20 Jan 2027

/** Syllabus-aligned assignment timing (lecture slug → assignment slug). */
const assignmentByLectureSlug: Record<string, string> = {
  "01-course-introduction": "project-orientation",
  "05-data-visualization-revised": "homework-1",
  "06-ml-dataflow-part-1-data-processing-revised": "project-phase-1",
  "09-regression": "homework-2",
  "11-unsupervised-and-semi-supervised-learning": "project-phase-2",
  "12-causality": "homework-3",
  "16-transformers-foundations-and-architectures": "homework-4",
  "19-diffusion-models": "homework-5",
  "20-modern-time-series-modeling-with-transformers": "homework-6",
  "22-ml-dataflow-part-4-pipeline-revised": "project-phase-3",
  "23-ml-dataflow-part-5-monitoring": "final-project-presentation",
};

function toIsoUtcDay(ms: number): string {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function lerpDate(index: number, count: number): string {
  if (count <= 1) return toIsoUtcDay(TERM_START);
  const t = index / (count - 1);
  return toIsoUtcDay(TERM_START + t * (TERM_END - TERM_START));
}

function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const ms = Date.UTC(y, m - 1, d) + days * 24 * 60 * 60 * 1000;
  const clamped = Math.min(ms, TERM_END);
  return toIsoUtcDay(clamped);
}

function workshopInstructorName(instructorId: string | undefined): string | undefined {
  if (!instructorId) return undefined;
  return staff.find((member) => member.id === instructorId || member.slug === instructorId)
    ?.name;
}

const publishedLectures = lectures
  .filter((lecture) => lecture.publish)
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const workshopsByLecture = new Map(
  workshops
    .filter((workshop) => workshop.publish)
    .map((workshop) => [workshop.lectureId, workshop] as const),
);

const rows: ScheduleEntry[] = [];
let sortOrder = 0;

publishedLectures.forEach((lecture, index) => {
  const date = lerpDate(index, publishedLectures.length);

  rows.push({
    id: `lecture-${lecture.slug}`,
    slug: lecture.slug,
    date,
    title: lecture.title,
    week: lecture.week,
    type: "lecture",
    instructor: lecture.presenter,
    description: lecture.summary,
    lectureIds: [lecture.slug],
    order: sortOrder++,
    publish: true,
  });

  const workshop = workshopsByLecture.get(lecture.slug);
  if (workshop || lecture.workshop) {
    const workshopSlug = workshop?.slug ?? `${lecture.slug}-workshop`;
    const title = workshop?.title ?? lecture.workshop!;
    rows.push({
      id: `workshop-${lecture.slug}`,
      slug: workshopSlug,
      date,
      title: `Workshop: ${title}`,
      week: lecture.week,
      type: "workshop",
      instructor: workshopInstructorName(workshop?.instructorId),
      description:
        workshop?.summary ?? `Hands-on workshop paired with “${lecture.title}”.`,
      lectureIds: [lecture.slug],
      order: sortOrder++,
      publish: true,
    });
  }

  const assignmentSlug = assignmentByLectureSlug[lecture.slug];
  if (!assignmentSlug) {
    return;
  }

  const assignment = assignments.find(
    (item) => item.slug === assignmentSlug && item.publish,
  );
  if (!assignment) {
    return;
  }

  const kindLabel = assignment.kind === "project" ? "Project" : "Homework";
  const releaseDate = date;
  const deadlineDate = addDaysIso(date, assignment.kind === "project" ? 21 : 14);

  rows.push({
    id: `release-${assignment.slug}`,
    slug: `release-${assignment.slug}`,
    date: releaseDate,
    title: `${kindLabel} release: ${assignment.title}`,
    week: lecture.week,
    type: "release",
    instructor: undefined,
    description: assignment.summary,
    assignmentIds: [assignment.slug],
    lectureIds: [lecture.slug],
    order: sortOrder++,
    publish: true,
  });

  rows.push({
    id: `deadline-${assignment.slug}`,
    slug: `deadline-${assignment.slug}`,
    date: deadlineDate,
    title: `${kindLabel} deadline: ${assignment.title}`,
    week: lecture.week,
    type: "deadline",
    instructor: undefined,
    description: "Provisional deadline — replace when official due dates are published.",
    assignmentIds: [assignment.slug],
    lectureIds: [lecture.slug],
    order: sortOrder++,
    publish: true,
  });
});

export const schedule: ScheduleEntry[] = rows;
