/**
 * Semester schedule table (provisional calendar).
 *
 * Dates span approximately **1 Mehr → end of Dey** (Persian calendar)
 * for the upcoming fall term and are placeholders until staff publish
 * the official calendar. Display uses Jalali + Gregorian labels.
 *
 * Rows include:
 * - one lecture row per allocated class session
 * - one workshop row when the lecture lists a workshop
 * - homework/project **release** and **deadline** rows (color-coded in the UI)
 */
import { assignments } from "./assignments";
import { lectures } from "./lectures";
import { staff } from "./staff";
import { workshops } from "./workshops";
import type { ScheduleEntry, Workshop } from "@/types/content";

/**
 * Schedule settings — edit these values when the calendar changes.
 * TERM_START must be the first Sunday; subsequent classes are generated
 * automatically for every Sunday and Tuesday.
 */
const TERM_START = Date.UTC(2026, 8, 27); // Sunday, 27 Sep 2026

/** Syllabus-aligned assignment timing (lecture slug → assignment slug). */
const assignmentByLectureSlug: Record<string, string> = {
  "05-data-visualization": "homework-1",
  "06-ml-dataflow-part-1-data-processing": "project-phase-1",
  "09-regression": "homework-2",
  "11-unsupervised-and-semi-supervised-learning": "project-phase-2",
  "12-causality": "homework-3",
  "16-transformers-foundations-and-architectures": "homework-4",
  "19-diffusion-models": "homework-5",
  "20-modern-time-series-modeling-with-transformers": "homework-6",
  "22-ml-dataflow-part-4-pipeline": "project-phase-3",
};

/**
 * Published deadline overrides. Use Gregorian ISO dates (`YYYY-MM-DD`);
 * this keeps the calendar easy to edit in one place.
 */
const assignmentDeadlineOverrides: Record<string, string> = {
  "homework-1": "2026-10-25", // Aban 3, 1405
  "project-phase-1": "2026-11-06", // Aban 15, 1405
  "homework-2": "2026-11-08", // Aban 17, 1405
  "homework-3": "2026-11-22", // Azar 1, 1405
  "project-phase-2": "2026-12-11", // Azar 11, 1405
  "homework-6": "2027-01-03", // Dey 13, 1405
  "project-phase-3": "2027-02-05", // Bahman 16, 1405
};

/** Published release-date overrides. Use Gregorian ISO dates (`YYYY-MM-DD`). */
const assignmentReleaseOverrides: Record<string, string> = {
  "project-phase-2": "2026-11-06", // Aban 15, 1405
  "project-phase-3": "2026-12-11", // Azar 20, 1405
  "homework-6": "2026-12-20", // Azar 29, 1405
};

function toIsoUtcDay(ms: number): string {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function sessionDate(index: number): string {
  return toIsoUtcDay(
    TERM_START +
      Math.floor(index / 2) * 7 * 24 * 60 * 60 * 1000 +
      (index % 2) * 2 * 24 * 60 * 60 * 1000,
  );
}

function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const ms = Date.UTC(y, m - 1, d) + days * 24 * 60 * 60 * 1000;
  return toIsoUtcDay(ms);
}

function workshopInstructorName(instructorId: string | undefined): string | undefined {
  if (!instructorId) return undefined;
  return staff.find((member) => member.id === instructorId || member.slug === instructorId)
    ?.name;
}

type ScheduledWorkshop = Pick<Workshop, "slug" | "title"> &
  Partial<Pick<Workshop, "summary" | "instructorId">>;

const publishedLectures = lectures
  .filter((lecture) => lecture.publish)
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const workshopsByLecture = new Map<string, ScheduledWorkshop[]>();
workshops
  .filter((workshop) => workshop.publish)
  .forEach((workshop) => {
    const lectureWorkshops = workshopsByLecture.get(workshop.lectureId ?? "") ?? [];
    lectureWorkshops.push(workshop);
    workshopsByLecture.set(workshop.lectureId ?? "", lectureWorkshops);
  });

const rows: ScheduleEntry[] = [];
let sortOrder = 0;
let sessionIndex = 0;

publishedLectures.forEach((lecture) => {
  const sessionCount = lecture.sessions ?? 1;
  for (let session = 0; session < sessionCount; session += 1) {
    const date = sessionDate(sessionIndex++);
    const sessionLabel =
      sessionCount > 1 ? ` (Session ${session + 1} of ${sessionCount})` : "";

  rows.push({
    id: `lecture-${lecture.slug}-${session + 1}`,
    slug: lecture.slug,
    date,
    title: `${lecture.title}${sessionLabel}`,
    week: lecture.week,
    type: "lecture",
    instructor: lecture.presenter,
    description: lecture.summary,
    lectureIds: [lecture.slug],
    order: sortOrder++,
    publish: true,
  });

  const lectureWorkshops = session === 0 ? workshopsByLecture.get(lecture.slug) ?? [] : [];
  const workshopsForSchedule: ScheduledWorkshop[] = lectureWorkshops.length > 0
    ? lectureWorkshops
    : session === 0 && lecture.workshop
      ? [{ title: lecture.workshop, slug: `${lecture.slug}-workshop` }]
      : [];
  workshopsForSchedule.forEach((workshop) => {
    rows.push({
      id: `workshop-${lecture.slug}`,
      slug: workshop.slug,
      date,
      title: workshop.title,
      week: lecture.week,
      type: "workshop",
      instructor: workshopInstructorName(workshop.instructorId),
      description:
        workshop.summary ?? `Hands-on workshop paired with “${lecture.title}”.`,
      lectureIds: [lecture.slug],
      order: sortOrder++,
      publish: true,
    });
  });

  const assignmentSlug = session === 0 ? assignmentByLectureSlug[lecture.slug] : undefined;
  if (!assignmentSlug) {
    return;
  }

  const assignment = assignments.find(
    (item) => item.slug === assignmentSlug && item.publish,
  );
  if (!assignment) {
    return;
  }

  const releaseDate = assignmentReleaseOverrides[assignment.slug] ?? date;
  const deadlineDate =
    assignmentDeadlineOverrides[assignment.slug] ??
    addDaysIso(date, assignment.kind === "project" ? 21 : 14);

  rows.push({
    id: `release-${assignment.slug}`,
    slug: `release-${assignment.slug}`,
    date: releaseDate,
    title: assignment.title,
    week: lecture.week,
    type: "release",
    instructor: undefined,
    description: assignment.summary,
    assignmentIds: [assignment.slug],
    lectureIds: [lecture.slug],
    order: sortOrder++,
    publish: true,
  });

  if (assignment.slug !== "project-orientation") {
    rows.push({
      id: `deadline-${assignment.slug}`,
      slug: `deadline-${assignment.slug}`,
      date: deadlineDate,
      title: assignment.title,
      week: lecture.week,
      type: "deadline",
      instructor: undefined,
      description: "Provisional deadline — replace when official due dates are published.",
      assignmentIds: [assignment.slug],
      lectureIds: [lecture.slug],
      order: sortOrder++,
      publish: true,
    });
  }
  }
});

// Final project presentations are meetings, not assignment records.
rows.push(
  {
    id: "final-project-presentation-1",
    slug: "final-project-presentation-1",
    date: "2027-02-06", // 17 Bahman 1405
    title: "Final project presentations (Day 1)",
    type: "other",
    description: "Final project presentation meeting.",
    order: sortOrder++,
    publish: true,
  },
  {
    id: "final-project-presentation-2",
    slug: "final-project-presentation-2",
    date: "2027-02-07", // 18 Bahman 1405
    title: "Final project presentations (Day 2)",
    type: "other",
    description: "Final project presentation meeting.",
    order: sortOrder++,
    publish: true,
  },
);

export const schedule: ScheduleEntry[] = rows;
