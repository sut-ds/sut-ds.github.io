"use client";

import { cx } from "@/lib/cx";

import styles from "./OnThisPage.module.css";

export type OnThisPageItem = {
  id: string;
  label: string;
};

type OnThisPageProps = {
  items: OnThisPageItem[];
  label?: string;
  className?: string;
};

function focusAnchorTarget(id: string) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  if (!target.hasAttribute("tabindex")) {
    target.tabIndex = -1;
  }

  // Keep sticky-header scroll from CSS; move keyboard focus to the destination.
  window.requestAnimationFrame(() => {
    target.focus({ preventScroll: true });
  });
}

export function OnThisPage({
  items,
  label = "On this page",
  className,
}: OnThisPageProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={cx(styles.nav, className)} aria-label={label}>
      <p className={styles.label}>{label}</p>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={styles.link}
              href={`#${item.id}`}
              onClick={() => focusAnchorTarget(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
