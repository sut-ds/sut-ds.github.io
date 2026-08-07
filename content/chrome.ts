import type { SiteChromeCopy } from "@/types/content";

export const chrome: SiteChromeCopy = {
  navLabels: {
    home: "Home",
    syllabus: "Syllabus",
    schedule: "Schedule",
    lectures: "Lectures",
    workshops: "Workshops",
    assignments: "Assignments",
    resources: "Resources",
    staff: "Staff",
  },
  utilityLabels: {
    announcements: "Announcements",
    faq: "FAQ",
    contact: "Contact",
  },
  footerBlurb:
    "Department of Electrical Engineering · Sharif University of Technology",
  emptyStates: {
    lectures: "Lecture materials will appear here as they are published.",
    workshops: "Workshop videos and materials will appear here as they are published.",
    assignments: "Assignments will be posted here.",
    schedule:
      "Session calendar dates are not published yet. See Schedule for syllabus order, or Lectures for topics and materials.",
    announcements: "No announcements yet.",
    resources: "Course resources will appear here as they are added.",
    faq: "FAQ items will appear here as they are published.",
    staff: "Staff profiles will appear here when they are published.",
    deadlines: "No upcoming deadlines yet — due dates will appear when published.",
  },
  ctaLabels: {
    syllabus: "View syllabus",
    lectures: "Browse lectures",
    assignments: "See assignments",
  },
  pageSupportingSentences: {
    home: "Orientation and current course activity.",
    syllabus: "Scannable course roadmap: goals, structure, assessment, and policies.",
    schedule: "Provisional Mehr–Dey table: sessions, workshops, releases, and deadlines.",
    lectures: "Ordered session timeline with workshops and presenters.",
    workshops: "TA-led studio labs with recordings and practice materials.",
    assignments: "Homework, projects, deadlines, and responsible TAs.",
    announcements: "Course updates and important notices.",
    resources: "Curated directory: courses, readings, and workshop tools.",
    faq: "Answers to common course questions.",
    staff: "Instructors, Head TA, and how to get in touch.",
  },
};
