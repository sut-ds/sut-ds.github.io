import Link from "next/link";

import { getChrome, getContact } from "@/lib/content";
import { cx } from "@/lib/cx";
import { UTILITY_NAV_HREFS } from "@/lib/nav";

import styles from "./UtilityNav.module.css";

type UtilityNavProps = {
  variant?: "default" | "onDark" | "compact";
  className?: string;
  includeContact?: boolean;
};

export function UtilityNav({
  variant = "default",
  className,
  includeContact = true,
}: UtilityNavProps) {
  const chrome = getChrome();
  const contact = getContact();

  return (
    <nav
      className={cx(
        styles.nav,
        variant === "onDark" && styles.onDark,
        variant === "compact" && styles.compact,
        className,
      )}
      aria-label="Utility"
    >
      <ul className={styles.list}>
        {UTILITY_NAV_HREFS.map((item) => (
          <li key={item.href}>
            <Link className={styles.link} href={item.href}>
              {chrome.utilityLabels[item.key]}
            </Link>
          </li>
        ))}
        {includeContact && contact.footerContactHref ? (
          <li>
            <Link className={styles.link} href={contact.footerContactHref}>
              {contact.footerContactLabel ?? chrome.utilityLabels.contact}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
