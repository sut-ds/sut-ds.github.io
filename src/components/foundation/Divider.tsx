import { cx } from "@/lib/cx";

import styles from "./Divider.module.css";

type DividerProps = {
  variant?: "light" | "brand" | "onDark";
  className?: string;
};

export function Divider({ variant = "light", className }: DividerProps) {
  return (
    <hr
      className={cx(
        styles.divider,
        variant === "brand" && styles.brand,
        variant === "onDark" && styles.onDark,
        className,
      )}
    />
  );
}
