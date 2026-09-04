/**
 * Lecture sequence for the semester.
 *
 * How to add materials for a lecture
 * ----------------------------------
 * 1. Store files under public/ (recommended):
 *      public/materials/lectures/<slug-or-session>-slides.pdf
 *    They are served at:
 *      /materials/lectures/<filename>
 *    Or use an external URL (Drive, LMS, YouTube, GitHub, …).
 *
 * 2. On that lecture’s row below, set optional `materials`:
 *      materials: [
 *        {
 *          label: "Slides",
 *          href: "/materials/lectures/01-course-introduction-slides.pdf",
 *          kind: "slides",   // "pdf" | "slides" | "notebook" | "video" | "other"
 *          external: false,  // true for off-site links
 *        },
 *        {
 *          label: "Notes",
 *          href: "/materials/lectures/01-course-introduction-notes.pdf",
 *          kind: "pdf",
 *          external: false,
 *        },
 *        {
 *          label: "Recording",
 *          href: "https://example.com/video",
 *          kind: "video",
 *          external: true,
 *        },
 *      ],
 *
 * 3. Links appear on /lectures under that session. Do not invent files —
 *    only add real materials when they are published.
 */
import type { Lecture, Material } from "@/types/content";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

type Row = {
  section: string;
  title: string;
  workshop: string;
  notes: string;
  presenter: string;
  resourceIds?: string[];
  materials?: Material[];
};

const rows: Row[] = [
  {
    section: "0",
    title: "Course Introduction",
    workshop: "Python",
    notes: "Course overview and expectations.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["python"],
  },
  {
    section: "0",
    title: "Course Introduction (tools)",
    workshop: "NumPy and Pandas",
    notes: "Data-science environment and essential tools.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["numpy", "pandas"],
  },
  {
    section: "1",
    title: "Data Models (Summary)",
    workshop: "Matplotlib and Seaborn",
    notes: "Foundations of data representation and modeling.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["matplotlib", "seaborn"],
  },
  {
    section: "2",
    title: "Databases (Lecture and Coordination)",
    workshop: "SQL",
    notes: "Relational databases, querying, and data acquisition.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["sql"],
  },
  {
    section: "3",
    title: "Data Visualization",
    workshop: "—",
    notes: "Principles of exploratory and explanatory visualization.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["matplotlib", "seaborn"],
  },
  {
    section: "5",
    title: "ML Dataflow – Part 1: Data Processing",
    workshop: "Web Scraping",
    notes: "Data collection, cleaning, preprocessing, and feature preparation.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["python"],
  },
  {
    section: "4",
    title: "Probability and Statistics",
    workshop: "—",
    notes: "Statistical learning foundations; based primarily on Tibshirani et al.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["isl"],
  },
  {
    section: "4",
    title: "Probability and Statistics (continued)",
    workshop: "—",
    notes:
      "Probability, estimation, uncertainty, and elementary inference for statistical learning.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["isl"],
  },
  {
    section: "6",
    title: "Regression",
    workshop: "Scikit-learn",
    notes:
      "Regression taught from a statistical-learning perspective, based primarily on Tibshirani et al.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["isl", "scikit-learn"],
  },
  {
    section: "7",
    title: "Supervised Machine Learning",
    workshop: "—",
    notes:
      "Classification, regularization, model selection, and related topics; based primarily on Tibshirani et al.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["isl", "scikit-learn"],
  },
  {
    section: "8",
    title: "Unsupervised and Semi-Supervised Learning",
    workshop: "—",
    notes:
      "Clustering, dimensionality reduction, and unsupervised learning; semi-supervised learning included if time permits. Based primarily on Tibshirani et al.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["isl", "scikit-learn"],
  },
  {
    section: "6",
    title: "Causality",
    workshop: "NetworkX and Plotly",
    notes: "Causal concepts and related material from the original syllabus.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["networkx", "plotly"],
  },
  {
    section: "10",
    title: "ML Dataflow – Part 2: Model Evaluation",
    workshop: "—",
    notes: "Evaluation protocols, validation, metrics, and error analysis.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["isl", "scikit-learn"],
  },
  {
    section: "10",
    title: "Introduction to Deep Learning: Neural Networks",
    workshop: "PyTorch and TensorFlow",
    notes: "Deep-learning foundations based on Sergey Levine’s course materials.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["levine-cs182", "pytorch", "tensorflow"],
  },
  {
    section: "11",
    title: "Deep Learning: MLPs, Feed-Forward and Recurrent Networks",
    workshop: "—",
    notes:
      "Core neural architectures and optimization, based on Sergey Levine’s course materials.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["levine-cs182", "pytorch", "tensorflow"],
  },
  {
    section: "16-18",
    title: "Transformers: Foundations and Architectures",
    workshop: "—",
    notes:
      "Replaces the original Classic NLP, Modern NLP Architecture, and LLM survey sequence; covers attention and transformer fundamentals.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["levine-cs182"],
  },
  {
    section: "16-18",
    title: "Building a Small Language Model",
    workshop: "Project Workshop",
    notes:
      "Hands-on construction of a small LLM, using Andrej Karpathy’s video lectures as the main practical reference.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: [
      "karpathy-zero-to-hero",
      "karpathy-nn-zero-to-hero-github",
      "karpathy-zero-to-hero-playlist",
    ],
  },
  {
    section: "13",
    title: "Generative Models",
    workshop: "—",
    notes:
      "Foundations of generative modeling, based on the principal/original research papers.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["ddpm-ho-2020", "song-ermon-score-matching-2019"],
  },
  {
    section: "14",
    title: "Diffusion Models",
    workshop: "—",
    notes:
      "Diffusion and score-based generative modeling, based on the principal/original research papers.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["ddpm-ho-2020", "song-ermon-score-matching-2019", "song-score-based-sde-2021"],
  },
  {
    section: "9",
    title: "Modern Time-Series Modeling with Transformers",
    workshop: "—",
    notes:
      "Moved after transformers and generative models to use the required neural-sequence foundations; based on recent transformer-based time-series papers.",
    presenter: "Dr. Amir Hossein Saberi",
    resourceIds: ["levine-cs182"],
  },
  {
    section: "15",
    title: "ML Dataflow – Part 3: Model Implementation",
    workshop: "—",
    notes: "Implementation, reproducibility, and integration of trained models.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["python"],
  },
  {
    section: "19",
    title: "ML Dataflow – Part 4: Pipeline",
    workshop: "—",
    notes: "End-to-end machine-learning pipelines.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["python", "scikit-learn"],
  },
  {
    section: "21",
    title: "ML Dataflow – Part 5: Monitoring",
    workshop: "—",
    notes: "Deployment monitoring, drift, reliability, and lifecycle management.",
    presenter: "Dr. Babak Hossein Khalaj",
    resourceIds: ["scikit-learn"],
  },
];

// Allocated meetings from the revised syllabus spreadsheet, in row order.
const sessionsByRow = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,
];

function weekFromSection(section: string): number | undefined {
  const match = section.match(/^\d+/);
  return match ? Number(match[0]) : undefined;
}

export const lectures: Lecture[] = rows.map((row, index) => ({
  slug: `${String(index + 1).padStart(2, "0")}-${slugify(row.title)}`,
  title: row.title,
  publish: true,
  sessions: sessionsByRow[index] ?? 1,
  order: index + 1,
  week: weekFromSection(row.section),
  summary: row.notes,
  workshop: row.workshop && row.workshop !== "—" ? row.workshop : undefined,
  presenter: row.presenter,
  resourceIds: row.resourceIds,
  materials: row.materials,
}));
