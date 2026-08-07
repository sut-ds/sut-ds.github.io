import { Prose } from "@/components/foundation/Prose";
import { cx } from "@/lib/cx";
import type { FaqItem as FaqItemModel } from "@/types/content";

import styles from "./FaqItem.module.css";

type FaqItemProps = {
  item: FaqItemModel;
  /** Static baseline for v1; disclosure lands later if chosen. */
  variant?: "static";
  className?: string;
  headingLevel?: "h2" | "h3";
};

export function FaqItem({
  item,
  variant = "static",
  className,
  headingLevel = "h3",
}: FaqItemProps) {
  const Heading = headingLevel;

  return (
    <article className={cx(styles.item, className)} id={item.slug}>
      <Heading className={styles.question}>{item.question}</Heading>
      {variant === "static" ? (
        <div className={styles.answer}>
          <Prose>
            <p>{item.answer}</p>
          </Prose>
        </div>
      ) : null}
    </article>
  );
}
