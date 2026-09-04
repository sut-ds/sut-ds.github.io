/** Content models from design-spec/07-content.md */

export type MaterialKind = "pdf" | "slides" | "notebook" | "video" | "other";

export type Material = {
  label: string;
  href: string;
  kind?: MaterialKind;
  external?: boolean;
};

export type ExternalLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type CourseIdentity = {
  title: string;
  institution: string;
  tagline: string;
  description: string;
  shortName?: string;
  objectives?: string[];
  prerequisites?: string | string[];
  semester?: string;
  department?: string;
  externalLinks?: ExternalLink[];
};

export type SyllabusSection = {
  id: string;
  title: string;
  body: string;
};

export type SyllabusPhase = {
  title: string;
  body: string;
};

export type SyllabusAssessmentItem = {
  /** Component name (e.g. Midterm, Homeworks) */
  title: string;
  /** Short description of what this component covers */
  detail: string;
  /** Grade weight display, e.g. "20%" or "TBD" */
  weight?: string;
};

export type SyllabusContent = {
  /** Short student-facing lead (1–2 sentences) */
  lead?: string;
  overview: string;
  structure: string;
  grading: string;
  policies: string;
  objectives?: string[];
  prerequisites?: string | string[];
  /** Scannable semester arc — preferred over structure prose alone */
  phases?: SyllabusPhase[];
  /** Assessment inventory — weights may be TBD */
  assessments?: SyllabusAssessmentItem[];
  gradingNote?: string;
  sections?: SyllabusSection[];
};

export type ScheduleEntryType =
  | "lecture"
  | "workshop"
  | "release"
  | "deadline"
  | "holiday"
  | "exam"
  | "lab"
  | "other";

/**
 * One row in the Schedule table.
 * Dates may be provisional placeholders (Mehr → Dey span) until the official calendar lands.
 */
export type ScheduleEntry = {
  id: string;
  slug: string;
  /** ISO calendar date `YYYY-MM-DD` (Asia/Tehran intent) */
  date: string;
  title: string;
  week?: number;
  endDate?: string;
  description?: string;
  type: ScheduleEntryType;
  /** Presenter / instructor for lecture & workshop rows */
  instructor?: string;
  isCurrent?: boolean;
  lectureIds?: string[];
  assignmentIds?: string[];
  resourceIds?: string[];
  order?: number;
  publish: boolean;
};

export type Reading = {
  title: string;
  href?: string;
  citation?: string;
};

export type Lecture = {
  slug: string;
  title: string;
  publish: boolean;
  /** Number of class meetings allocated to this topic. */
  sessions?: number;
  week?: number;
  date?: string;
  summary?: string;
  /** Workshop / lab focus label when applicable */
  workshop?: string;
  /** Presenter display name */
  presenter?: string;
  materials?: Material[];
  readings?: Reading[];
  assignmentIds?: string[];
  resourceIds?: string[];
  scheduleEntryId?: string;
  order?: number;
};

/**
 * Hands-on workshop paired with a lecture session.
 * Video and materials are optional until staff publish them.
 */
export type Workshop = {
  slug: string;
  title: string;
  publish: boolean;
  /** Short description of the workshop focus */
  summary?: string;
  week?: number;
  date?: string;
  order?: number;
  /** Linked lecture slug */
  lectureId?: string;
  /** TA who leads the workshop (`StaffMember.id`) */
  instructorId?: string;
  /** Recording when available */
  video?: Material;
  /** Notebooks, slides, handouts, etc. */
  materials?: Material[];
};

/**
 * Project modeling fallback (13-v1-freeze): assignment records with kind.
 * Separate Project type remains OPEN.
 */
export type AssignmentKind = "assignment" | "project";

export type AssignmentStatus = "upcoming" | "open" | "closed" | "TBD";

export type ContentImage = {
  src: string;
  alt: string;
};

export type Assignment = {
  slug: string;
  title: string;
  publish: boolean;
  number?: number;
  kind?: AssignmentKind;
  /** Published release date, derived from the schedule when available. */
  releaseAt?: string;
  dueAt?: string;
  summary?: string;
  body?: string;
  status?: AssignmentStatus;
  /** Optional mark / logo shown on the Assignments list */
  logo?: ContentImage;
  materials?: Material[];
  submissionNote?: string;
  lectureIds?: string[];
  resourceIds?: string[];
  /** Responsible TA staff ids (`StaffMember.id`) for this homework/project */
  taIds?: string[];
  order?: number;
};

export type Announcement = {
  id: string;
  slug: string;
  title: string;
  date: string;
  body: string;
  publish: boolean;
  pinned?: boolean;
  excerpt?: string;
  relatedLectureIds?: string[];
  relatedAssignmentIds?: string[];
};

export type ResourceCategory =
  | "courses"
  | "tools"
  | "readings"
  | "datasets"
  | "links"
  | string;

export type Resource = {
  id: string;
  slug: string;
  title: string;
  href: string;
  category: ResourceCategory;
  publish: boolean;
  description?: string;
  external?: boolean;
};

export type StaffRole = "instructor" | "ta" | string;

export type StaffLink = {
  label: string;
  href: string;
};

export type StaffPhoto = {
  src: string;
  alt: string;
};

export type StaffMember = {
  id: string;
  slug: string;
  name: string;
  role: StaffRole;
  publish: boolean;
  title?: string;
  email?: string;
  /** Telegram handle (`@name`), username, or full `https://t.me/...` URL */
  telegram?: string;
  officeHours?: string;
  officeLocation?: string;
  links?: StaffLink[];
  photo?: StaffPhoto;
  bio?: string;
  order?: number;
};

export type FaqItem = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  publish: boolean;
  order?: number;
};

export type ContactGuidance = {
  body: string;
  footerContactLabel?: string;
  footerContactHref?: string;
};

export type EmptyStateKey =
  | "lectures"
  | "workshops"
  | "assignments"
  | "schedule"
  | "announcements"
  | "resources"
  | "faq"
  | "staff"
  | "deadlines";

export type SiteChromeCopy = {
  navLabels: Record<string, string>;
  utilityLabels: {
    announcements: string;
    faq: string;
    contact: string;
  };
  emptyStates: Record<EmptyStateKey, string>;
  footerBlurb?: string;
  ctaLabels?: {
    syllabus?: string;
    lectures?: string;
    assignments?: string;
  };
  pageSupportingSentences: Record<string, string>;
};

export type CourseContent = {
  course: CourseIdentity;
  syllabus: SyllabusContent;
  schedule: ScheduleEntry[];
  lectures: Lecture[];
  workshops: Workshop[];
  assignments: Assignment[];
  announcements: Announcement[];
  resources: Resource[];
  staff: StaffMember[];
  faq: FaqItem[];
  contact: ContactGuidance;
  chrome: SiteChromeCopy;
};
