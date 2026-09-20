/**
 * Hands-on workshops paired with lecture sessions, plus standalone labs.
 *
 * How to publish a workshop
 * -------------------------
 * 1. Set `instructorId` to a TA `StaffMember.id` from content/staff.ts
 *    (e.g. "mohammad-eshtehardian"). Omit until the TA is confirmed.
 *
 * 2. Video (optional):
 *      video: {
 *        label: "Recording",
 *        href: "https://…",
 *        kind: "video",
 *        external: true,
 *      }
 *
 * 3. Schedule date (optional) — Gregorian ISO day (`YYYY-MM-DD`):
 *      date: "2026-10-15",
 *    Omit until the workshop time is confirmed. Unscheduled workshops stay
 *    off the course calendar and show as “Time TBD” on the Workshops page.
 *
 * 4. Materials (optional) — notebooks, slides, handouts:
 *      materials: [
 *        {
 *          label: "Notebook",
 *          href: "/materials/workshops/01-python.ipynb",
 *          kind: "notebook",
 *          external: false,
 *        },
 *        {
 *          label: "Slides",
 *          href: "/materials/workshops/01-python-slides.pdf",
 *          kind: "slides",
 *          external: false,
 *        },
 *      ]
 *
 * Lecture-paired workshops: use `workshopOverrides` keyed by lecture slug.
 * Standalone workshops (no lecture link): add to `standaloneWorkshops` below.
 *
 * Do not invent video URLs or files — only add real materials when published.
 */
import { lectures } from "./lectures";
import type { Workshop } from "@/types/content";

type WorkshopOverride = Partial<
  Pick<
    Workshop,
    | "title"
    | "summary"
    | "instructorId"
    | "date"
    | "video"
    | "materials"
    | "publish"
  >
>;

type StandaloneWorkshop = WorkshopOverride & {
  slug: string;
  title: string;
  order?: number;
};

/**
 * Optional overrides keyed by lecture slug.
 * Use this table to add, remove, or edit workshop details without changing
 * the lecture sequence. Use an array to publish multiple workshops for one
 * lecture. Set `date` on an override when the workshop time is confirmed.
 */
const workshopOverrides: Record<string, WorkshopOverride | WorkshopOverride[]> = {
  "01-course-introduction": { instructorId: "soheil-sayahvarg" },
  "02-course-introduction": { instructorId: "mohammadali-naderi" },
  "04-databases": [
    { instructorId: "shahab-hosseini" },
    { title: "Docker", instructorId: "shahab-hosseini" },
  ],
  "12-causality": {
    instructorId: "pooya-gholami",
  },
  "09-regression": {
    instructorId: "mohammad-mahdi-roshani",
  },
  "14-introduction-to-deep-learning-neural-networks": {
    instructorId: "parham-faizolahi",
  },
};

/** Workshops that are not tied to a single lecture session. */
const standaloneWorkshops: StandaloneWorkshop[] = [
  {
    slug: "project-workshop",
    title: "Project Workshop",
    summary:
      "Hands-on project studio for milestones, implementation help, and team check-ins.",
    instructorId: "kiarash-rashidi",
    publish: true,
  },
];

const publishedLecturesWithWorkshop = lectures
  .filter((lecture) => lecture.publish && lecture.workshop)
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

let nextWorkshopOrder = 1;

const lectureWorkshops: Workshop[] = publishedLecturesWithWorkshop.flatMap(
  (lecture) => {
    const configuredOverrides = workshopOverrides[lecture.slug];
    const overrides = Array.isArray(configuredOverrides)
      ? configuredOverrides
      : [configuredOverrides ?? {}];

    return overrides.map((override, workshopIndex) => ({
      slug:
        workshopIndex === 0
          ? `${lecture.slug}-workshop`
          : `${lecture.slug}-workshop-${workshopIndex + 1}`,
      title: override.title ?? lecture.workshop!,
      publish: override.publish ?? true,
      order: nextWorkshopOrder++,
      week: lecture.week,
      date: override.date,
      lectureId: lecture.slug,
      summary:
        override.summary ??
        `Hands-on workshop paired with “${lecture.title}”.`,
      instructorId: override.instructorId,
      video: override.video,
      materials: override.materials,
    }));
  },
);

const standalone: Workshop[] = standaloneWorkshops.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  publish: entry.publish ?? true,
  order: entry.order ?? nextWorkshopOrder++,
  date: entry.date,
  summary: entry.summary ?? `Hands-on ${entry.title}.`,
  instructorId: entry.instructorId,
  video: entry.video,
  materials: entry.materials,
}));

export const workshops: Workshop[] = [...lectureWorkshops, ...standalone].sort(
  (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
);
