import { cx } from "@/lib/cx";
import type { Resource } from "@/types/content";

import styles from "./ResourceRow.module.css";

type ResourceRowProps = {
  resource: Resource;
  className?: string;
  /** `featured` for courses/readings; `compact` for dense tool lists */
  density?: "featured" | "default" | "compact";
};

function hostnameFromHref(href: string): string | null {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return host || null;
  } catch {
    return null;
  }
}

export function ResourceRow({
  resource,
  className,
  density = "default",
}: ResourceRowProps) {
  const external = resource.external !== false;
  const host = hostnameFromHref(resource.href);

  return (
    <li
      className={cx(
        styles.item,
        density === "featured" && styles.featured,
        density === "compact" && styles.compact,
        className,
      )}
    >
      <a
        className={styles.linkBlock}
        href={resource.href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <h3 className={styles.title}>
          {resource.title}
          {external ? (
            <span className={styles.externalMark} aria-hidden="true">
              ↗
            </span>
          ) : null}
          {external ? (
            <span className="visually-hidden"> (opens in new tab)</span>
          ) : null}
        </h3>
        {host ? <p className={styles.host}>{host}</p> : null}
        {resource.description ? (
          <p className={styles.description}>{resource.description}</p>
        ) : null}
      </a>
    </li>
  );
}
