import type { Metadata } from "next";

import { ResourceRow } from "@/components/collection/ResourceRow";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { OnThisPage } from "@/components/foundation/OnThisPage";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import { getChrome, getPublishedResources, getResourcesGroupedByCategory } from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

import styles from "./resources.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.navLabels.resources,
  chrome.pageSupportingSentences.resources,
  "/resources/"
);

function densityForCategory(
  category: string,
): "featured" | "default" | "compact" {
  if (category === "courses") return "featured";
  if (category === "tools") return "compact";
  return "default";
}

export default function ResourcesPage() {
  const chrome = getChrome();
  const resources = getPublishedResources();
  const groups = getResourcesGroupedByCategory();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.navLabels.resources },
  ];
  const onThisPage = [
    ...groups.map((group) => ({
      id: group.category,
      label: `${group.label} (${group.items.length})`,
    })),
    { id: "need-help", label: "Need help?" },
  ];

  return (
    <ContentPage
      title={chrome.navLabels.resources}
      description={chrome.pageSupportingSentences.resources}
      breadcrumbs={breadcrumbs}
    >
      {resources.length === 0 ? (
        <EmptyState
          message={chrome.emptyStates.resources}
          links={[
            { href: "/lectures", label: chrome.navLabels.lectures },
            { href: "/faq", label: chrome.utilityLabels.faq },
          ]}
        />
      ) : (
        <div className={styles.layout}>
          <OnThisPage items={onThisPage} />

          <div className={styles.main}>
            <p className={styles.curationNote}>
              A curated directory of syllabus-cited courses, papers, and workshop
              tools — not a second lecture materials index. Jump by category, then
              open the link you need.
            </p>

            {groups.map((group) => {
              const density = densityForCategory(group.category);
              const compact = density === "compact";

              return (
                <section
                  key={group.category}
                  id={group.category}
                  className={styles.section}
                  aria-labelledby={`${group.category}-heading`}
                >
                  <p className={styles.kicker}>Browse</p>
                  <div className={styles.sectionHeader}>
                    <h2
                      className={styles.sectionTitle}
                      id={`${group.category}-heading`}
                    >
                      {group.label}
                    </h2>
                    <span className={styles.count}>{group.items.length}</span>
                  </div>
                  <p className={styles.sectionLead}>{group.lead}</p>
                  <ul
                    className={cx(styles.list, compact && styles.listCompact)}
                    aria-label={group.label}
                  >
                    {group.items.map((resource) => (
                      <ResourceRow
                        key={resource.id}
                        resource={resource}
                        density={density}
                      />
                    ))}
                  </ul>
                </section>
              );
            })}

            <section
              id="need-help"
              className={styles.help}
              aria-labelledby="resources-help"
            >
              <h2 className={styles.helpTitle} id="resources-help">
                Looking for something else?
              </h2>
              <p className={styles.helpBody}>
                Lecture slides and notes live on Lectures. Course logistics and
                policies live on Syllabus. For questions, start with FAQ or Staff.
              </p>
              <ul className={styles.helpLinks}>
                <li>
                  <TextLink href="/lectures">{chrome.navLabels.lectures}</TextLink>
                </li>
                <li>
                  <TextLink href="/syllabus">{chrome.navLabels.syllabus}</TextLink>
                </li>
                <li>
                  <TextLink href="/faq">{chrome.utilityLabels.faq}</TextLink>
                </li>
                <li>
                  <TextLink href="/staff">{chrome.navLabels.staff}</TextLink>
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </ContentPage>
  );
}
