import type { SVGProps } from "react";

import { cx } from "@/lib/cx";

import styles from "./Icon.module.css";

/**
 * Icon wrapper without a locked library (v1 freeze fallback).
 * Add named strokes here as needed; swap to a package later without API churn.
 */
const paths = {
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  external: "M8 6h10v10M18 6L7 17",
} as const;

export type IconName = keyof typeof paths;

type IconProps = {
  name: IconName;
  size?: 16 | 20 | 24;
  decorative?: boolean;
  title?: string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "children" | "name">;

export function Icon({
  name,
  size = 20,
  decorative = true,
  title,
  className,
  ...rest
}: IconProps) {
  return (
    <svg
      className={cx(styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      {...rest}
    >
      {!decorative && title ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}
