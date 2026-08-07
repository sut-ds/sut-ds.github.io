import type { ElementType, ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  variant?: "default" | "narrow" | "wide";
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  variant = "default",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cx(styles.container, styles[variant], className)}>{children}</Tag>
  );
}
