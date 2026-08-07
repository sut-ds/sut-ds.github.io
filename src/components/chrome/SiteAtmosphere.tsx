import { DynamicScene } from "@/components/home/DynamicScene";

import styles from "./SiteAtmosphere.module.css";

/**
 * Site-wide decorative atmosphere (all pages).
 * Home hero still mounts a stronger `intensity="hero"` scene locally.
 */
export function SiteAtmosphere() {
  return (
    <div className={`site-atmosphere ${styles.root}`} aria-hidden="true">
      <div className={styles.wash} />
      <div className={styles.grid} />
      <DynamicScene intensity="subtle" />
    </div>
  );
}
