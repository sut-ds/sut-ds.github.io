import type { CourseIdentity } from "@/types/content";

export const course: CourseIdentity = {
  title: "Foundations of Data Science",
  shortName: "FoDS 2026",
  institution: "Sharif University of Technology",
  department: "Department of Electrical Engineering",
  tagline:
    "From data models and statistical learning to modern deep learning, transformers, and end-to-end ML pipelines.",
  description:
    "Undergraduate Foundations of Data Science at the Department of Electrical Engineering, Sharif University of Technology. The course covers data models, databases, visualization, probability and statistics, classical machine learning, deep learning and transformers, generative models, and the practical ML dataflow from processing through monitoring.",
  semester: "Fall 2026",
  objectives: [
    "Build fluency with core data-science tools and data representations.",
    "Apply probability, statistics, and classical machine-learning methods with sound evaluation.",
    "Understand modern neural architectures, transformers, and generative models at a foundational level.",
    "Assemble end-to-end machine-learning workflows from data processing to monitoring.",
  ],
  prerequisites:
    "Programming familiarity and undergraduate-level mathematics (linear algebra, calculus, and basic probability) are recommended. Exact prerequisites may be clarified by course staff.",
};
