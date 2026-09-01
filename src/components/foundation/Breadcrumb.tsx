import Link from "next/link";

import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  ariaLabel?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      className={styles.breadcrumb}
      aria-label="Breadcrumb"
      role="navigation"
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {!isLast && item.href ? (
                <>
                  <Link
                    href={item.href}
                    className={styles.link}
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                </>
              ) : (
                <span
                  className={styles.current}
                  aria-current="page"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
