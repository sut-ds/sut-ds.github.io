import { TextLink } from "@/components/foundation/TextLink";
import { cx } from "@/lib/cx";

import styles from "./EmptyState.module.css";

type EmptyStateLink = {
  href: string;
  label: string;
};

type EmptyStateProps = {
  message: string;
  detail?: string;
  links?: EmptyStateLink[];
  className?: string;
};

export function EmptyState({ message, detail, links, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <p className={styles.message}>{message}</p>
      {detail ? <p className={styles.detail}>{detail}</p> : null}
      {links && links.length > 0 ? (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <TextLink href={link.href}>{link.label}</TextLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
