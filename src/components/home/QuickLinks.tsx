import { SectionHeader } from "@/components/foundation/SectionHeader";
import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";

import styles from "./QuickLinks.module.css";

export type QuickLinkItem = {
  href: string;
  label: string;
};

type QuickLinksProps = {
  links: QuickLinkItem[];
  title?: string;
  className?: string;
};

export function QuickLinks({
  links,
  title = "Explore the course",
  className,
}: QuickLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className={cx(styles.section, className)} aria-labelledby="home-quick-links">
      <SectionHeader id="home-quick-links" title={title} />
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <TextLink className={styles.link} href={link.href}>
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
