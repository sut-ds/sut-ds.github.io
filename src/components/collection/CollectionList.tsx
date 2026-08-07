import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./CollectionList.module.css";

type CollectionListProps = {
  children: ReactNode;
  variant?: "default" | "compact";
  className?: string;
  "aria-label"?: string;
};

export function CollectionList({
  children,
  variant = "default",
  className,
  "aria-label": ariaLabel,
}: CollectionListProps) {
  return (
    <ul
      className={cx(styles.list, variant === "compact" && styles.compact, className)}
      aria-label={ariaLabel}
    >
      {children}
    </ul>
  );
}

type CollectionGroupProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function CollectionGroup({ title, children, className }: CollectionGroupProps) {
  return (
    <section className={cx(styles.group, className)}>
      <h2 className={styles.groupTitle}>{title}</h2>
      {children}
    </section>
  );
}
