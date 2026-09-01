import { getCourse } from "@/lib/content";
import { generatePersonSchema, renderSchemaScript } from "@/lib/schema";
import type { StaffMember } from "@/types/content";

export function StaffPersonSchema({ staff }: { staff: StaffMember }) {
  const course = getCourse();
  const schema = generatePersonSchema(staff, course.institution);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: renderSchemaScript(schema),
      }}
    />
  );
}
