"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getChrome } from "@/lib/content";
import { cx } from "@/lib/cx";
import { PRIMARY_NAV_HREFS } from "@/lib/nav";

import styles from "./PrimaryNav.module.css";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav() {
  const pathname = usePathname();
  const chrome = getChrome();

  return (
    <nav aria-label="Primary">
      <ul className={styles.list}>
        {PRIMARY_NAV_HREFS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                className={cx(styles.link, active && styles.active)}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                {chrome.navLabels[item.key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
