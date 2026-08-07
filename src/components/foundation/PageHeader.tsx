import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cx(styles.header, className)}>
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </header>
  );
}
