/**
 * Hands-on workshops paired with lecture sessions.
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
 * 3. Materials (optional) — notebooks, slides, handouts:
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

/**
 * Optional overrides keyed by lecture slug.
 * Use this table to add, remove, or edit workshop details without changing
 * the lecture sequence. Use an array to publish multiple workshops for one
 * lecture. Dates stay TBD unless an override publishes one.
 */
const workshopOverrides: Record<string, WorkshopOverride | WorkshopOverride[]> = {
  "02-course-introduction": { instructorId: "mohammadali-naderi" },
  "04-databases": [
    { instructorId: "shahab-hosseini" },
    { title: "Docker", instructorId: "shahab-hosseini" },
  ],
  "17-building-a-small-language-model": {
    instructorId: "kiarash-rashidi",
  },
  "12-causality": {
    instructorId: "pooya-gholami",
  },
};

const publishedLecturesWithWorkshop = lectures
  .filter((lecture) => lecture.publish && lecture.workshop)
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

let nextWorkshopOrder = 1;

export const workshops: Workshop[] = publishedLecturesWithWorkshop.flatMap(
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
