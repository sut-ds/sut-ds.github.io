import type { ReactNode } from "react";

import { Container } from "@/components/foundation/Container";
import { PageHeader } from "@/components/foundation/PageHeader";

import styles from "./ContentPage.module.css";

type ContentPageProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export function ContentPage({
  title,
  description,
  actions,
  children,
}: ContentPageProps) {
  return (
    <Container className={styles.page}>
      <PageHeader title={title} description={description} actions={actions} />
      <div className={styles.body}>{children}</div>
    </Container>
  );
}
