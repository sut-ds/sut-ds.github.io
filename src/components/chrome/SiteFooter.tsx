import Link from "next/link";

import { UniversityMark } from "@/components/chrome/UniversityMark";
import { UtilityNav } from "@/components/chrome/UtilityNav";
import { Container } from "@/components/foundation/Container";
import { getChrome, getCourse } from "@/lib/content";
import { PRIMARY_NAV_HREFS } from "@/lib/nav";

import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const course = getCourse();
  const chrome = getChrome();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <UniversityMark onDark size="md" />
          <div>
            <p className={styles.course}>{course.title}</p>
            <p className={styles.meta}>
              {chrome.footerBlurb ??
                [course.department, course.institution].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <div className={styles.navBlock}>
          <p className={styles.navLabel}>Explore</p>
          <ul className={styles.primaryList}>
            {PRIMARY_NAV_HREFS.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{chrome.navLabels[item.key]}</Link>
              </li>
            ))}
          </ul>
          <UtilityNav variant="onDark" />
        </div>
      </Container>
    </footer>
  );
}
