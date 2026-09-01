import type { ReactNode } from "react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/foundation/Breadcrumb";
import { Container } from "@/components/foundation/Container";
import { PageHeader } from "@/components/foundation/PageHeader";

import styles from "./ContentPage.module.css";

type ContentPageProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export function ContentPage({
  title,
  description,
  actions,
  children,
  breadcrumbs,
}: ContentPageProps) {
  return (
    <Container className={styles.page}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      <PageHeader title={title} description={description} actions={actions} />
      <div className={styles.body}>{children}</div>
    </Container>
  );
}
