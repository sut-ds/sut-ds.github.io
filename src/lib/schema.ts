/**
 * Schema.org JSON-LD generators for structured data.
 * Helps search engines understand course, organization, staff, and event information.
 */

import type { CourseIdentity, StaffMember } from "@/types/content";

const siteUrl = "https://sut-ds.github.io";

/**
 * Generate Organization schema for Sharif University
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Sharif University of Technology",
    url: "https://sharif.edu",
    logo: `${siteUrl}/og.png`,
    sameAs: [
      "https://en.wikipedia.org/wiki/Sharif_University_of_Technology",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Azadi St.",
      addressLocality: "Tehran",
      addressCountry: "IR",
    },
  };
}

/**
 * Generate Course schema
 */
export function generateCourseSchema(
  course: CourseIdentity,
  instructors?: StaffMember[]
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${siteUrl}/syllabus/`,
    provider: {
      "@type": "EducationalOrganization",
      name: course.institution,
      url: "https://sharif.edu",
    },
  };

  if (instructors && instructors.length > 0) {
    schema.instructor = instructors.map((instructor) => ({
      "@type": "Person",
      name: instructor.name,
      email: instructor.email,
    }));
  }

  return schema;
}

/**
 * Generate Person schema for staff members
 */
export function generatePersonSchema(
  staff: StaffMember,
  institution: string
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: staff.name,
    jobTitle: staff.title,
    email: staff.email,
    affiliation: {
      "@type": "EducationalOrganization",
      name: institution,
    },
    url: `${siteUrl}/staff#${staff.slug}`,
  };

  if (staff.photo) {
    schema.image = `${siteUrl}${staff.photo.src}`;
  }

  return schema;
}

/**
 * Generate EducationEvent schema for assignments/workshops
 */
export function generateEducationEventSchema(
  name: string,
  description?: string,
  startDate?: string,
  endDate?: string,
  eventLocation?: string
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name,
    description,
    url: siteUrl,
    organizer: {
      "@type": "EducationalOrganization",
      name: "Sharif University of Technology",
    },
  };

  if (startDate) schema.startDate = startDate;
  if (endDate) schema.endDate = endDate;
  if (eventLocation)
    schema.location = {
      "@type": "Place",
      name: eventLocation,
    };

  return schema;
}

/**
 * Convert schema object to JSON-LD string
 */
export function renderSchemaScript(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
