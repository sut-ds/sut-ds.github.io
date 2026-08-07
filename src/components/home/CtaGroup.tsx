import { Button, type ButtonVariant } from "@/components/foundation/Button";
import { cx } from "@/lib/cx";

import styles from "./CtaGroup.module.css";

export type CtaItem = {
  href: string;
  label: string;
  variant?: ButtonVariant;
};

type CtaGroupProps = {
  items: CtaItem[];
  className?: string;
  size?: "md" | "lg";
};

export function CtaGroup({ items, className, size = "md" }: CtaGroupProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cx(styles.group, className)} role="group" aria-label="Primary paths">
      {items.map((item, index) => (
        <Button
          key={item.href}
          href={item.href}
          size={size}
          variant={
            item.variant ??
            (index === 0 ? "onDark" : index === 1 ? "onDarkSecondary" : "onDarkGhost")
          }
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
