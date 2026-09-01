import { generateEducationEventSchema, renderSchemaScript } from "@/lib/schema";
import type { Assignment } from "@/types/content";

export function AssignmentSchema({ assignment }: { assignment: Assignment }) {
  const schema = generateEducationEventSchema(
    assignment.title,
    assignment.summary,
    undefined,
    undefined,
    "Sharif University of Technology"
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: renderSchemaScript(schema),
      }}
    />
  );
}
