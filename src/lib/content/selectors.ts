import { content } from "@content/index";

import type {
  Announcement,
  Assignment,
  FaqItem,
  Lecture,
  Resource,
  ScheduleEntry,
  StaffMember,
  Workshop,
} from "@/types/content";

function byOrderThenTitle<T extends { order?: number; title?: string; name?: string }>(
  a: T,
  b: T,
): number {
  const orderA = a.order ?? Number.POSITIVE_INFINITY;
  const orderB = b.order ?? Number.POSITIVE_INFINITY;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  const labelA = a.title ?? a.name ?? "";
  const labelB = b.title ?? b.name ?? "";
  return labelA.localeCompare(labelB);
}

export function getCourse() {
  return content.course;
}

export function getSyllabus() {
  return content.syllabus;
}

export function getChrome() {
  return content.chrome;
}

export function getContact() {
  return content.contact;
}

export function getPublishedSchedule(): ScheduleEntry[] {
  return content.schedule
    .filter((entry) => entry.publish)
    .slice()
    .sort((a, b) => {
      const byDate = a.date.localeCompare(b.date);
      if (byDate !== 0) return byDate;
      const orderA = a.order ?? Number.POSITIVE_INFINITY;
      const orderB = b.order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
}

export function getPublishedLectures(): Lecture[] {
  return content.lectures
    .filter((lecture) => lecture.publish)
    .slice()
    .sort(byOrderThenTitle);
}

export function getPublishedWorkshops(): Workshop[] {
  return content.workshops
    .filter((workshop) => workshop.publish)
    .slice()
    .sort(byOrderThenTitle);
}

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return getPublishedWorkshops().find((workshop) => workshop.slug === slug);
}

export function getWorkshopByLectureId(lectureId: string): Workshop | undefined {
  return getPublishedWorkshops().find(
    (workshop) => workshop.lectureId === lectureId,
  );
}

export function getLectureBySlug(slug: string): Lecture | undefined {
  return getPublishedLectures().find((lecture) => lecture.slug === slug);
}

export function getPublishedAssignments(): Assignment[] {
  const deadlines = new Map(
    content.schedule
      .filter((entry) => entry.publish && entry.type === "deadline" && entry.assignmentIds?.[0])
      .map((entry) => [entry.assignmentIds![0], entry.date] as const),
  );
  const releases = new Map(
    content.schedule
      .filter((entry) => entry.publish && entry.type === "release" && entry.assignmentIds?.[0])
      .map((entry) => [entry.assignmentIds![0], entry.date] as const),
  );

  return content.assignments
    .filter((assignment) => assignment.publish)
    .slice()
    .map((assignment) => {
      const scheduleDeadline = deadlines.get(assignment.slug);
      const scheduleRelease = releases.get(assignment.slug);
      return {
        ...assignment,
        ...(scheduleRelease && !assignment.releaseAt ? { releaseAt: scheduleRelease } : {}),
        ...(scheduleDeadline && !assignment.dueAt ? { dueAt: scheduleDeadline } : {}),
      };
    })
    .sort(byOrderThenTitle);
}

export function getAssignmentBySlug(slug: string): Assignment | undefined {
  return getPublishedAssignments().find((assignment) => assignment.slug === slug);
}

export function getPublishedProjects(): Assignment[] {
  return getPublishedAssignments().filter((assignment) => assignment.kind === "project");
}

/** Upcoming deadlines from published assignments with future dueAt. */
export function getUpcomingDeadlines(now = new Date()): Assignment[] {
  const nowMs = now.getTime();

  return getPublishedAssignments()
    .filter((assignment) => {
      if (!assignment.dueAt) {
        return false;
      }
      const due = new Date(assignment.dueAt).getTime();
      return !Number.isNaN(due) && due >= nowMs;
    })
    .sort((a, b) => String(a.dueAt).localeCompare(String(b.dueAt)));
}

export function getPublishedAnnouncements(): Announcement[] {
  return content.announcements
    .filter((item) => item.publish)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

/** Home slice: pinned first, then latest by date. */
export function getHomeAnnouncements(limit = 3): Announcement[] {
  const published = getPublishedAnnouncements();
  const pinned = published.filter((item) => item.pinned);
  const rest = published.filter((item) => !item.pinned);
  return [...pinned, ...rest].slice(0, limit);
}

export function getPublishedResources(): Resource[] {
  return content.resources
    .filter((resource) => resource.publish)
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
}

export function getPublishedStaff(): StaffMember[] {
  const roleRank = (role: string) => {
    if (role === "instructor") return 0;
    if (role === "ta") return 1;
    return 2;
  };

  return content.staff
    .filter((member) => member.publish)
    .slice()
    .sort((a, b) => {
      const roleDiff = roleRank(a.role) - roleRank(b.role);
      if (roleDiff !== 0) {
        return roleDiff;
      }
      return byOrderThenTitle(a, b);
    });
}

export function getPublishedFaq(): FaqItem[] {
  return content.faq
    .filter((item) => item.publish)
    .slice()
    .sort((a, b) => {
      const category = a.category.localeCompare(b.category);
      if (category !== 0) {
        return category;
      }
      return byOrderThenTitle(
        { order: a.order, title: a.question },
        { order: b.order, title: b.question },
      );
    });
}

/** Group published FAQ items by category (sorted category keys). */
export function getFaqGroupedByCategory(): Array<{
  category: string;
  items: FaqItem[];
}> {
  const groups = new Map<string, FaqItem[]>();

  for (const item of getPublishedFaq()) {
    const existing = groups.get(item.category) ?? [];
    existing.push(item);
    groups.set(item.category, existing);
  }

  return Array.from(groups.entries()).map(([category, items]) => ({
    category,
    items,
  }));
}

function isHeadTeachingAssistant(member: StaffMember): boolean {
  return member.role === "ta" && /head/i.test(member.title ?? "");
}

export type StaffTeachingFocus = {
  homeworks: string[];
  projects: string[];
  workshops: string[];
};

/** Coursework and labs a TA is listed on in content/assignments.ts and content/workshops.ts. */
export function getStaffTeachingFocus(staffId: string): StaffTeachingFocus {
  const homeworks: string[] = [];
  const projects: string[] = [];
  const workshops: string[] = [];

  for (const assignment of getPublishedAssignments()) {
    if (!assignment.taIds?.includes(staffId)) {
      continue;
    }
    if (assignment.kind === "project") {
      projects.push(assignment.title);
    } else {
      homeworks.push(assignment.title);
    }
  }

  for (const workshop of getPublishedWorkshops()) {
    if (workshop.instructorId === staffId) {
      workshops.push(workshop.title);
    }
  }

  return { homeworks, projects, workshops };
}

/** High-level focus label for staff cards, e.g. “Homeworks & workshops”. */
export function formatStaffFocusAreas(focus: StaffTeachingFocus): string | undefined {
  const areas: string[] = [];
  if (focus.homeworks.length > 0) {
    areas.push("Homeworks");
  }
  if (focus.projects.length > 0) {
    areas.push("Course project");
  }
  if (focus.workshops.length > 0) {
    areas.push("Workshops");
  }
  if (areas.length === 0) {
    return undefined;
  }
  if (areas.length === 1) {
    return areas[0];
  }
  if (areas.length === 2) {
    return `${areas[0]} & ${areas[1]}`;
  }
  return `${areas[0]}, ${areas[1]} & ${areas[2]}`;
}

export function staffFocusDetailLines(focus: StaffTeachingFocus): string[] {
  const lines: string[] = [];
  if (focus.homeworks.length > 0) {
    lines.push(`Homeworks: ${focus.homeworks.join(", ")}`);
  }
  if (focus.projects.length > 0) {
    lines.push(`Project: ${focus.projects.join(", ")}`);
  }
  if (focus.workshops.length > 0) {
    lines.push(`Workshops: ${focus.workshops.join(", ")}`);
  }
  return lines;
}

export type StaffFocusSection = {
  id: string;
  title: string;
  members: StaffMember[];
};

type StaffInvolvementKind = "homework" | "project" | "workshop";

/** Lower rank = more senior (used after course-timeline order). */
function staffSeniorityRank(member: StaffMember): number {
  const bio = member.bio?.toLowerCase() ?? "";
  if (bio.includes("phd student")) {
    return 0;
  }
  if (bio.includes("msc graduate")) {
    return 1;
  }
  if (bio.includes("msc student")) {
    return 2;
  }
  if (bio.includes("bsc graduate")) {
    return 3;
  }
  if (bio.includes("bsc student")) {
    return 4;
  }
  return Number.POSITIVE_INFINITY;
}

function earliestInvolvementOrder(
  staffId: string,
  kind: StaffInvolvementKind,
): number {
  if (kind === "homework") {
    const items = getPublishedAssignments().filter(
      (assignment) =>
        assignment.kind !== "project" && assignment.taIds?.includes(staffId),
    );
    return items.length
      ? Math.min(...items.map((assignment) => assignment.order ?? Number.POSITIVE_INFINITY))
      : Number.POSITIVE_INFINITY;
  }

  if (kind === "project") {
    const items = getPublishedAssignments().filter(
      (assignment) =>
        assignment.kind === "project" && assignment.taIds?.includes(staffId),
    );
    return items.length
      ? Math.min(...items.map((assignment) => assignment.order ?? Number.POSITIVE_INFINITY))
      : Number.POSITIVE_INFINITY;
  }

  const workshops = getPublishedWorkshops().filter(
    (workshop) => workshop.instructorId === staffId,
  );
  return workshops.length
    ? Math.min(...workshops.map((workshop) => workshop.order ?? Number.POSITIVE_INFINITY))
    : Number.POSITIVE_INFINITY;
}

function earliestOverallInvolvementOrder(staffId: string): number {
  const orders = [
    earliestInvolvementOrder(staffId, "homework"),
    earliestInvolvementOrder(staffId, "project"),
    earliestInvolvementOrder(staffId, "workshop"),
  ].filter((order) => Number.isFinite(order));

  return orders.length ? Math.min(...orders) : Number.POSITIVE_INFINITY;
}

function sortStaffByInvolvement(
  members: StaffMember[],
  kind: StaffInvolvementKind | "overall",
): StaffMember[] {
  return members.slice().sort((a, b) => {
    const orderA =
      kind === "overall"
        ? earliestOverallInvolvementOrder(a.id)
        : earliestInvolvementOrder(a.id, kind);
    const orderB =
      kind === "overall"
        ? earliestOverallInvolvementOrder(b.id)
        : earliestInvolvementOrder(b.id, kind);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    const seniorityA = staffSeniorityRank(a);
    const seniorityB = staffSeniorityRank(b);
    if (seniorityA !== seniorityB) {
      return seniorityA - seniorityB;
    }

    return a.name.localeCompare(b.name);
  });
}

/** Staff page sections: instructors, head TA, then TAs grouped by teaching focus. */
export function getStaffFocusSections(): StaffFocusSection[] {
  const { instructors, headTeachingAssistants, teachingAssistants, other } =
    getStaffByRole();
  const teachingAssistantsAll = [...headTeachingAssistants, ...teachingAssistants];

  const homeworkAssistants = sortStaffByInvolvement(
    teachingAssistantsAll.filter(
      (member) => getStaffTeachingFocus(member.id).homeworks.length > 0,
    ),
    "homework",
  );
  const projectAssistants = sortStaffByInvolvement(
    teachingAssistantsAll.filter(
      (member) => getStaffTeachingFocus(member.id).projects.length > 0,
    ),
    "project",
  );
  const workshopAssistants = sortStaffByInvolvement(
    teachingAssistantsAll.filter(
      (member) => getStaffTeachingFocus(member.id).workshops.length > 0,
    ),
    "workshop",
  );

  return [
    {
      id: "instructors",
      title: "Instructors",
      members: instructors,
    },
    {
      id: "head-teaching-assistants",
      title: "Head teaching assistant",
      members: sortStaffByInvolvement(headTeachingAssistants, "overall"),
    },
    {
      id: "homework-assistants",
      title: "Homework assistants",
      members: homeworkAssistants,
    },
    {
      id: "project-assistants",
      title: "Course project assistants",
      members: projectAssistants,
    },
    {
      id: "workshop-assistants",
      title: "Workshop assistants",
      members: workshopAssistants,
    },
    {
      id: "other-staff",
      title: "Course staff",
      members: other,
    },
  ].filter((section) => section.members.length > 0);
}

export function getStaffByRole(): {
  instructors: StaffMember[];
  headTeachingAssistants: StaffMember[];
  teachingAssistants: StaffMember[];
  other: StaffMember[];
} {
  const staff = getPublishedStaff();
  const teachingAssistants = staff.filter((member) => member.role === "ta");
  const headTeachingAssistants = teachingAssistants.filter(isHeadTeachingAssistant);
  const regularTeachingAssistants = teachingAssistants.filter(
    (member) => !isHeadTeachingAssistant(member),
  );

  return {
    instructors: staff.filter((member) => member.role === "instructor"),
    headTeachingAssistants,
    teachingAssistants: regularTeachingAssistants,
    other: staff.filter((member) => member.role !== "instructor" && member.role !== "ta"),
  };
}

export function getStaffByIds(ids: string[] = []): StaffMember[] {
  if (ids.length === 0) return [];
  const published = getPublishedStaff();
  return ids
    .map((id) => published.find((member) => member.id === id || member.slug === id))
    .filter((member): member is StaffMember => Boolean(member));
}

export function getLecturesByIds(ids: string[] = []): Lecture[] {
  if (ids.length === 0) return [];
  const published = getPublishedLectures();
  return ids
    .map((id) => published.find((lecture) => lecture.slug === id))
    .filter((lecture): lecture is Lecture => Boolean(lecture));
}

export function getAssignmentsByIds(ids: string[] = []): Assignment[] {
  if (ids.length === 0) return [];
  const published = getPublishedAssignments();
  return ids
    .map((id) => published.find((assignment) => assignment.slug === id))
    .filter((assignment): assignment is Assignment => Boolean(assignment));
}

export function getResourcesByIds(ids: string[] = []): Resource[] {
  if (ids.length === 0) return [];
  const published = getPublishedResources();
  return ids
    .map((id) => published.find((resource) => resource.id === id || resource.slug === id))
    .filter((resource): resource is Resource => Boolean(resource));
}

/** Preferred category order for the Resources directory. */
export const RESOURCE_CATEGORY_ORDER = [
  "courses",
  "readings",
  "tools",
  "datasets",
  "links",
] as const;

const RESOURCE_CATEGORY_META: Record<
  string,
  { label: string; lead: string }
> = {
  courses: {
    label: "Courses",
    lead: "External lecture series and course sites cited in the syllabus.",
  },
  readings: {
    label: "Readings",
    lead: "Core textbooks and papers for classical ML and generative models.",
  },
  tools: {
    label: "Tools",
    lead: "Language and library docs used in workshops — keep these bookmarked.",
  },
  datasets: {
    label: "Datasets",
    lead: "Data sources referenced for projects and assignments.",
  },
  links: {
    label: "Links",
    lead: "Other useful references that do not fit the groups above.",
  },
};

function resourceCategoryMeta(category: string): { label: string; lead: string } {
  return (
    RESOURCE_CATEGORY_META[category] ?? {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      lead: "Additional course references in this group.",
    }
  );
}

/** Group published resources by category for the Resources page. */
export function getResourcesGroupedByCategory(): Array<{
  category: string;
  label: string;
  lead: string;
  items: Resource[];
}> {
  const groups = new Map<string, Resource[]>();

  for (const resource of getPublishedResources()) {
    const existing = groups.get(resource.category) ?? [];
    existing.push(resource);
    groups.set(resource.category, existing);
  }

  const orderedKeys = [
    ...RESOURCE_CATEGORY_ORDER.filter((key) => groups.has(key)),
    ...Array.from(groups.keys()).filter(
      (key) =>
        !(RESOURCE_CATEGORY_ORDER as readonly string[]).includes(key),
    ),
  ];

  return orderedKeys.map((category) => {
    const meta = resourceCategoryMeta(category);
    return {
      category,
      label: meta.label,
      lead: meta.lead,
      items: groups.get(category) ?? [],
    };
  });
}

/** Group published lectures by week when week is present. */
export function getLecturesGroupedByWeek(): Array<{
  key: string;
  label: string;
  items: Lecture[];
}> {
  const lectures = getPublishedLectures();
  const withWeek = lectures.filter((lecture) => lecture.week != null);
  const withoutWeek = lectures.filter((lecture) => lecture.week == null);

  const weekMap = new Map<number, Lecture[]>();
  for (const lecture of withWeek) {
    const week = lecture.week as number;
    const existing = weekMap.get(week) ?? [];
    existing.push(lecture);
    weekMap.set(week, existing);
  }

  const groups = Array.from(weekMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([week, items]) => ({
      key: `week-${week}`,
      label: `Week ${week}`,
      items,
    }));

  if (withoutWeek.length > 0) {
    groups.push({
      key: "ungrouped",
      label: "Lectures",
      items: withoutWeek,
    });
  }

  return groups;
}
