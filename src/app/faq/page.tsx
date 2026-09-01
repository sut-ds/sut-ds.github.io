import type { Metadata } from "next";

import { FaqItem } from "@/components/domain/FaqItem";
import { ContentPage } from "@/components/foundation/ContentPage";
import { EmptyState } from "@/components/foundation/EmptyState";
import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { getChrome, getFaqGroupedByCategory } from "@/lib/content";
import { generatePageMetadata } from "@/lib/metadata";

import styles from "./faq.module.css";

const chrome = getChrome();

export const metadata: Metadata = generatePageMetadata(
  chrome.utilityLabels.faq,
  chrome.pageSupportingSentences.faq,
  "/faq/"
);

function categoryHeading(category: string): string {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function FaqPage() {
  const chrome = getChrome();
  const groups = getFaqGroupedByCategory();
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: chrome.utilityLabels.faq },
  ];
  return (
    <ContentPage
      title={chrome.utilityLabels.faq}
      description={chrome.pageSupportingSentences.faq}
      breadcrumbs={breadcrumbs}
    >
      {groups.length === 0 ? (
        <EmptyState
          message={chrome.emptyStates.faq}
          links={[
            { href: "/syllabus", label: chrome.navLabels.syllabus },
            { href: "/staff", label: chrome.navLabels.staff },
          ]}
        />
      ) : (
        groups.map((group) => {
          const headingId = `faq-${group.category || "general"}`;
          return (
            <section
              key={group.category}
              className={styles.category}
              aria-labelledby={headingId}
            >
              <SectionHeader id={headingId} title={categoryHeading(group.category)} />
              <ul className={styles.categoryList}>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <FaqItem item={item} variant="static" />
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}

      <section className={styles.help} aria-labelledby="faq-help">
        <SectionHeader id="faq-help" title="Still need help?" />
        <ul className={styles.helpList}>
          <li>
            <TextLink href="/staff">{chrome.navLabels.staff}</TextLink>
          </li>
          <li>
            <TextLink href="/staff#contact">Contact guidance</TextLink>
          </li>
          <li>
            <TextLink href="/syllabus">{chrome.navLabels.syllabus}</TextLink>
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
