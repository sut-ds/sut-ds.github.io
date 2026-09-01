import { getCourse, getStaffByRole } from "@/lib/content";
import {
  generateCourseSchema,
  generateOrganizationSchema,
  renderSchemaScript,
} from "@/lib/schema";

/**
 * Renders JSON-LD schema scripts for Organization and Course
 */
export function SchemaScripts() {
  const course = getCourse();
  const { instructors } = getStaffByRole();

  const organizationSchema = generateOrganizationSchema();
  const courseSchema = generateCourseSchema(course, instructors);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderSchemaScript(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: renderSchemaScript(courseSchema),
        }}
      />
    </>
  );
}
