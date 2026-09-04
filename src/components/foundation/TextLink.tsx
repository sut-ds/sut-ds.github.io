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
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M14 3h7v7M21 3 10 14" />
            <path d="M18 13v8H3V6h8" />
          </svg>
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
