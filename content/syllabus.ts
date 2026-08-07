import type { SyllabusContent } from "@/types/content";

/**
 * Syllabus copy follows student-centered UX guidance:
 * short lead, scannable sections, transparent assessment inventory,
 * supportive policy tone, and links to Lectures / Assignments / Staff for details.
 */
export const syllabus: SyllabusContent = {
  lead:
    "Foundations of Data Science is an undergraduate course offered by the Department of Electrical Engineering at Sharif University of Technology. The course combines theoretical foundations with hands-on learning, emphasizing practical skills, computational thinking, and the development of end-to-end machine learning workflows.",
  overview:
    "The course covers essential topics in data analysis and statistical learning before progressing to contemporary approaches in deep learning, generative modeling, and modern AI systems. Through a combination of lectures, practical exercises, and project-based work, students develop the knowledge and skills needed to apply machine learning methods to real-world problems.",
  objectives: [
    "Use core data-science tools and data representations confidently.",
    "Apply probability, statistics, and classical ML methods with sound evaluation.",
    "Explain modern neural architectures, transformers, and generative models at a foundational level.",
    "Build end-to-end ML workflows from data processing through monitoring.",
  ],
  prerequisites: [
    "Programming familiarity (Python preferred).",
    "Undergraduate mathematics: linear algebra, calculus, and basic probability.",
    "Confirm any formal prerequisites with course staff if unsure.",
  ],
  structure:
    "The semester follows four arcs: foundations and data tooling; statistical learning; deep learning and generative models; then ML dataflow modules and the multi-phase project. See Lectures for the ordered session list.",
  phases: [
    {
      title: "Foundations & data tooling",
      body: "Introduction, data models, databases, visualization, and ML dataflow — processing.",
    },
    {
      title: "Statistical learning",
      body: "Probability and statistics, regression, supervised and unsupervised learning, causality, and model evaluation.",
    },
    {
      title: "Deep learning & generative models",
      body: "Neural networks, transformers and small language models, generative and diffusion models, and modern time-series modeling.",
    },
    {
      title: "ML dataflow & project",
      body: "Implementation, pipelines, monitoring, and the multi-phase course project through final presentation.",
    },
  ],
  grading:
    "Your grade combines exams, quizzes, homework, and the course project. The table below lists each component; exact weights will appear when staff publish them.",
  assessments: [
    {
      title: "Midterm",
      weight: "TBD",
      detail: "In-term exam covering foundations and statistical-learning topics covered to that point.",
    },
    {
      title: "Final",
      weight: "TBD",
      detail: "End-of-term exam spanning the full course, with emphasis on later modules as announced.",
    },
    {
      title: "Quizzes",
      weight: "TBD",
      detail: "Short checks on lecture and workshop material; schedule and format announced in class.",
    },
    {
      title: "Homeworks",
      weight: "TBD",
      detail:
        "Problem sets (including the time-series assignment) spanning visualization, classical ML, deep learning, and related topics.",
    },
    {
      title: "Project",
      weight: "TBD",
      detail:
        "Multi-phase course project from orientation through Phases 1–3 and the final presentation.",
    },
  ],
  gradingNote:
    "Grade weights are not published yet. When available, they will replace the TBD values in this table and may also be announced on the site. Until then, use this table as the assessment inventory only.",
  policies:
    "Follow in-class announcements for attendance, late work, academic integrity, and preferred contact channels. Prefer the responsible TA listed on each assignment when asking about a specific homework or project phase; use the Staff page for emails and Telegram when published. Policy details will be expanded here once instructors finalize them.",
  sections: [
    { id: "overview", title: "Overview", body: "" },
    { id: "objectives", title: "Learning objectives", body: "" },
    { id: "prerequisites", title: "Prerequisites", body: "" },
    { id: "structure", title: "Course structure", body: "" },
    { id: "grading", title: "Evaluation / grading", body: "" },
    { id: "policies", title: "Policies", body: "" },
  ],
};
