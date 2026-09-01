import type { Assignment } from "@/types/content";

/**
 * Responsible TAs: set `taIds` to StaffMember `id` values from content/staff.ts.
 * Example: taIds: ["mohammad-eshtehardian"]
 * Multiple TAs: taIds: ["ta-a", "ta-b"]
 */

function logo(slug: string, title: string) {
  return {
    src: `/images/assignments/${slug}.svg`,
    alt: `${title} logo`,
  };
}

export const assignments: Assignment[] = [
  {
    slug: "homework-1",
    title: "Homework 1",
    number: 1,
    publish: true,
    kind: "assignment",
    order: 2,
    status: "TBD",
    logo: logo("homework-1", "Homework 1"),
    summary:
      "Data manipulation, visualization, and elementary inference (aligned with the data visualization module).",
    taIds: ["hossein-soleimani"],
  },
  {
    slug: "project-phase-1",
    title: "Project Phase 1",
    publish: true,
    kind: "project",
    order: 3,
    status: "TBD",
    logo: logo("project-phase-1", "Project Phase 1"),
    summary:
      "First project phase, aligned with ML dataflow — data processing (collection, cleaning, preprocessing, and feature preparation).",
    taIds: ["kiarash-rashidi"],
  },
  {
    slug: "homework-2",
    title: "Homework 2",
    number: 2,
    publish: true,
    kind: "assignment",
    order: 4,
    status: "TBD",
    logo: logo("homework-2", "Homework 2"),
    summary:
      "Web scraping, database population, probability and statistics, and regression.",
  },
  {
    slug: "project-phase-2",
    title: "Project Phase 2",
    publish: true,
    kind: "project",
    order: 5,
    status: "TBD",
    logo: logo("project-phase-2", "Project Phase 2"),
    summary:
      "Second project phase, aligned with unsupervised and semi-supervised learning topics.",
    taIds: ["kiarash-rashidi"],
  },
  {
    slug: "homework-3",
    title: "Homework 3",
    number: 3,
    publish: true,
    kind: "assignment",
    order: 6,
    status: "TBD",
    logo: logo("homework-3", "Homework 3"),
    summary: "Classical machine learning.",
    taIds: ["darya-azaddel"],
  },
  {
    slug: "homework-4",
    title: "Homework 4",
    number: 4,
    publish: true,
    kind: "assignment",
    order: 7,
    status: "TBD",
    logo: logo("homework-4", "Homework 4"),
    summary: "Causality and deep learning and transformers.",
    taIds: ["mohammad-hossein-momeni", "ali-rezaei"],
  },
  {
    slug: "homework-5",
    title: "Homework 5",
    number: 5,
    publish: true,
    kind: "assignment",
    order: 8,
    status: "TBD",
    logo: logo("homework-5", "Homework 5"),
    summary: "Generative and diffusion models.",
    taIds: ["mohammad-eshtehardian"],
  },
  {
    slug: "homework-6",
    title: "Homework 6",
    number: 6,
    publish: true,
    kind: "assignment",
    order: 9,
    status: "TBD",
    logo: logo("homework-6", "Homework 6"),
    summary: "Time-series Forecasting.",
    taIds: ["amir-reza-azari", "saba-atashfaraz"],
  },
  {
    slug: "project-phase-3",
    title: "Project Phase 3",
    publish: true,
    kind: "project",
    order: 10,
    status: "TBD",
    logo: logo("project-phase-3", "Project Phase 3"),
    summary: "Third project phase, aligned with the ML pipeline module.",
    taIds: ["kiarash-rashidi"],
  },
];
