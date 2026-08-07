import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";
import type { Material } from "@/types/content";

import styles from "./MaterialLinks.module.css";

type MaterialLinksProps = {
  materials: Material[];
  className?: string;
};

export function MaterialLinks({ materials, className }: MaterialLinksProps) {
  if (materials.length === 0) {
    return null;
  }

  return (
    <ul className={cx(styles.list, className)}>
      {materials.map((material) => (
        <li key={`${material.label}-${material.href}`}>
          <TextLink
            href={material.href}
            variant="material"
            external={material.external ?? true}
          >
            {material.label}
          </TextLink>
        </li>
      ))}
    </ul>
  );
}
