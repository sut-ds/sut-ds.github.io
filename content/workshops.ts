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

/**
 * Optional overrides keyed by lecture slug.
 * Use to set instructorId, video, materials, or custom title/summary.
 */
const workshopOverrides: Record<
  string,
  Partial<
    Pick<
      Workshop,
      "title" | "summary" | "instructorId" | "video" | "materials" | "publish"
    >
  >
> = {
  // Example (uncomment when ready):
  // "01-course-introduction": {
  //   instructorId: "mohammad-eshtehardian",
  //   video: {
  //     label: "Recording",
  //     href: "https://example.com/workshop-01",
  //     kind: "video",
  //     external: true,
  //   },
  // },
};

const publishedLecturesWithWorkshop = lectures
  .filter((lecture) => lecture.publish && lecture.workshop)
  .slice()
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const workshops: Workshop[] = publishedLecturesWithWorkshop.map(
  (lecture, index) => {
    const override = workshopOverrides[lecture.slug] ?? {};
    return {
      slug: `${lecture.slug}-workshop`,
      title: override.title ?? lecture.workshop!,
      publish: override.publish ?? true,
      order: index + 1,
      week: lecture.week,
      date: lecture.date,
      lectureId: lecture.slug,
      summary:
        override.summary ??
        `Hands-on workshop paired with “${lecture.title}”.`,
      instructorId: override.instructorId,
      video: override.video,
      materials: override.materials,
    };
  },
);
