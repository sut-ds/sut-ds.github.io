import type { ReactNode } from "react";

import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";

import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeader({
  title,
  description,
  actionHref,
  actionLabel,
  children,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, className)}>
      <h2 className={styles.title} id={id}>
        {title}
      </h2>
      {actionHref && actionLabel ? (
        <TextLink className={styles.action} href={actionHref}>
          {actionLabel}
        </TextLink>
      ) : null}
      {children}
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
