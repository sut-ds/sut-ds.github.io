/** Primary + utility nav hrefs; labels come from content chrome. */

export const PRIMARY_NAV_HREFS = [
  { href: "/", key: "home" },
  { href: "/syllabus", key: "syllabus" },
  { href: "/schedule", key: "schedule" },
  { href: "/lectures", key: "lectures" },
  { href: "/workshops", key: "workshops" },
  { href: "/assignments", key: "assignments" },
  { href: "/resources", key: "resources" },
  { href: "/staff", key: "staff" },
] as const;

export const UTILITY_NAV_HREFS = [
  { href: "/announcements", key: "announcements" },
  { href: "/faq", key: "faq" },
] as const;
