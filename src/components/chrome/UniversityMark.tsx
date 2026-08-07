import { cx } from "@/lib/cx";

import styles from "./UniversityMark.module.css";

const SHARIF_LOGO_SRC = "/images/Sharif.png";

type UniversityMarkProps = {
  className?: string;
  /** Lighten a dark mark for navy/footer surfaces */
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
  /** Decorative next to visible institution text → hide from AT */
  decorative?: boolean;
};

/**
 * Official Sharif University of Technology mark (`public/images/Sharif.png`).
 */
export function UniversityMark({
  className,
  onDark = false,
  size = "md",
  decorative = false,
}: UniversityMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; single small PNG
    <img
      className={cx(
        styles.mark,
        size === "sm" && styles.sm,
        size === "lg" && styles.lg,
        onDark && styles.onDark,
        className,
      )}
      src={SHARIF_LOGO_SRC}
      alt={decorative ? "" : "Sharif University of Technology"}
      width={64}
      height={64}
      decoding="async"
      aria-hidden={decorative || undefined}
    />
  );
}
