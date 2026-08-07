import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./Prose.module.css";

type ProseProps = {
  children: ReactNode;
  className?: string;
  lead?: boolean;
};

export function Prose({ children, className, lead = false }: ProseProps) {
  return (
    <div className={cx(styles.prose, lead && styles.lead, className)}>{children}</div>
  );
}
