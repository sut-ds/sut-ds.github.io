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
  return content.assignments
    .filter((assignment) => assignment.publish)
    .slice()
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

export function getStaffByRole(): {
  instructors: StaffMember[];
  teachingAssistants: StaffMember[];
  other: StaffMember[];
} {
  const staff = getPublishedStaff();
  return {
    instructors: staff.filter((member) => member.role === "instructor"),
    teachingAssistants: staff.filter((member) => member.role === "ta"),
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
