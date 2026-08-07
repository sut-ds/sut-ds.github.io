import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./TextLink.module.css";

export type TextLinkVariant = "internal" | "external" | "material" | "onDark";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  variant?: TextLinkVariant;
  className?: string;
  external?: boolean;
};

export function TextLink({
  href,
  children,
  variant = "internal",
  className,
  external,
}: TextLinkProps) {
  const isExternal = external ?? variant === "external";
  const classNames = cx(
    styles.link,
    variant === "material" && styles.material,
    variant === "onDark" && styles.onDark,
    className,
  );

  if (isExternal) {
    return (
      <a
        className={classNames}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className={styles.externalIndicator} aria-hidden="true">
          ↗
        </span>
        <span className="visually-hidden"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link className={classNames} href={href}>
      {children}
    </Link>
  );
}
