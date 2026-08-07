import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./StatusLabel.module.css";

type StatusLabelProps = {
  children: ReactNode;
  variant?: "brand" | "accent" | "warm" | "neutral";
  className?: string;
};

export function StatusLabel({
  children,
  variant = "neutral",
  className,
}: StatusLabelProps) {
  return (
    <span className={cx(styles.label, styles[variant], className)}>{children}</span>
  );
}
