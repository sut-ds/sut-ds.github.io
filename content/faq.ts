import type { FaqItem } from "@/types/content";

export const faq: FaqItem[] = [
  {
    id: "where-is-syllabus",
    slug: "where-is-syllabus",
    question: "Where can I find the course syllabus and lecture order?",
    answer:
      "See the Syllabus page for overview, structure, and grading notes, and the Lectures page for the revised topic sequence with presenters and workshop themes.",
    category: "logistics",
    publish: true,
    order: 1,
  },
  {
    id: "who-teaches-what",
    slug: "who-teaches-what",
    question: "Who teaches which topics?",
    answer:
      "Dr. Babak Hossein Khalaj covers introduction, data models, databases, visualization, ML dataflow modules, and causality. Dr. Amir Hossein Saberi covers statistical learning, deep learning, transformers and small LLMs, generative/diffusion models, and modern time series. Details appear on each lecture summary and on the Staff page.",
    category: "logistics",
    publish: true,
    order: 2,
  },
  {
    id: "head-ta",
    slug: "head-ta",
    question: "Who is the Head TA?",
    answer:
      "Mohammad Eshtehardian is the Head Teaching Assistant. Email and Telegram appear on the Staff page when published.",
    category: "logistics",
    publish: true,
    order: 3,
  },
  {
    id: "how-to-contact",
    slug: "how-to-contact",
    question: "How do I contact instructors or TAs?",
    answer:
      "Use the email and Telegram links on the Staff page when listed. For a specific homework or project phase, prefer the responsible TA named on that item on the Assignments page.",
    category: "logistics",
    publish: true,
    order: 4,
  },
  {
    id: "homework-list",
    slug: "homework-list",
    question: "What homeworks and project phases are planned?",
    answer:
      "The Assignments page lists Homework 1–5, a time-series assignment, project orientation, Phases 1–3, and the final presentation. Each item can name its responsible TA(s). Deadlines and handouts will appear when published; do not assume dates until they are posted.",
    category: "assignments",
    publish: true,
    order: 5,
  },
  {
    id: "when-are-deadlines",
    slug: "when-are-deadlines",
    question: "Where are due dates?",
    answer:
      "Due dates are not yet published in the revised syllabus spreadsheet. Watch Announcements and the Assignments page; upcoming deadlines will surface on Home once dueAt values are set in the course content.",
    category: "assignments",
    publish: true,
    order: 6,
  },
  {
    id: "tools",
    slug: "tools",
    question: "Which tools should I install?",
    answer:
      "Workshop themes include Python, NumPy, Pandas, Matplotlib, Seaborn, SQL, web scraping, scikit-learn, PyTorch, TensorFlow, NetworkX, and Plotly. Start from the Resources page for official documentation links.",
    category: "tools",
    publish: true,
    order: 7,
  },
];
